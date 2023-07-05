<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="prose" v-html="sanitizedDescription" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { onMounted, ref, useRestApi, watch } from "#imports";

const allowedTags = ["h1", "h2", "h3", "h4", "h5", "h6", "em", "strong", "del", "a", "img", "ul", "ol", "li", "hr"];
const allowedExtensions = ["png", "PNG", "jpg", "JPG", "jpeg", "JPEG", "gif", "GIF"];

const props = defineProps({
  source: {
    type: String,
    required: true
  }
});

const rest = useRestApi().value;

const sanitizedDescription = ref("");

const options = {
  headerIds: false,
  mangle: false
};

const source = computed(() => props.source);

watch(source, () => {
  sanitizeDescription();
});

onMounted(() => {
  sanitizeDescription();
});

function markdown (src: string) {
  // Convert the markdown to HTML.
  return marked(src, options);
}

async function sanitizeDescription () {
  // Get the original not sanitized markdown string.
  const html = markdown(props.source);

  // Sanitize the description to remove any harmful HTML.
  const sanitizedHtml = DOMPurify.sanitize(html, { ALLOWED_TAGS: allowedTags });

  // Parse the description as HTML to easily manipulate it.
  const parser = new DOMParser();
  const descriptionHtml = parser.parseFromString(sanitizedHtml, "text/html");

  // Remove all external links.
  const links = descriptionHtml.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#")) {
      link.removeAttribute("href");
    }
  });

  // Replace images with data from the image proxy
  const images = descriptionHtml.querySelectorAll("img");
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const src = img.getAttribute("src");

    if (src) {
      if (isAllowedImage(src)) {
        const imageDataSrc = await getImageDataUrl(src);
        img.setAttribute("src", imageDataSrc);
      } else {
        img.remove();
      }
    }
  }

  // Convert the description HTML back to a string.
  const body = descriptionHtml.querySelector("body");
  const serializer = new XMLSerializer();
  let sanitizedDescriptionStr = "";
  if (body) {
    sanitizedDescriptionStr = serializer.serializeToString(body);
    sanitizedDescriptionStr = sanitizedDescriptionStr
      .replace("<body xmlns=\"http://www.w3.org/1999/xhtml\">", "")
      .replace("<body>", "")
      .replace("</body>", "");
  }

  sanitizedDescription.value = sanitizedDescriptionStr;
}

// Returns true if the image is allowed to be displayed.
function isAllowedImage (href: string): boolean {
  const extension = href.split(".").pop().trim();
  return allowedExtensions.includes(extension);
}

// Returns a base64 string ready to be use in a "src" attribute in a "img" html tag,
// like this `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gA…IiIiIiIiIiIiIiHyO/P85XT/jxW1glg5Erk==">`.
async function getImageDataUrl (url: string): Promise<string> {
  const imageBlob = await rest.torrent.proxiedImage(url);
  const data = await blobToDataURL(imageBlob);
  return data;
}

// Convert binary data into a base64 encoded string ready to be use in a "src"
// attribute in a "img" html tag, like the following:
// `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gA…IiIiIiIiIiIiIiHyO/P85XT/jxW1glg5Erk==">`.
function blobToDataURL (blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = _e => resolve(reader.result as string);
    reader.onerror = _e => reject(reader.error);
    reader.onabort = _e => reject(new Error("Read aborted"));
    reader.readAsDataURL(blob);
  });
}
</script>

<style scoped>

</style>
