import DOMPurify from "dompurify";
import { useRestApi } from "../../../composables/states";

const rest = useRestApi().value;

const allowedTags = ["h1", "h2", "h3", "h4", "h5", "h6", "em", "strong", "del", "a", "img", "ul", "ol", "li", "hr"];
const allowedImageExtensions = ["png", "PNG", "jpg", "JPG", "jpeg", "JPEG", "gif", "GIF"];

export async function sanitize (html: string) {
  const safeHtml = remove_harmful_code(html);
  const htmlWithNoUserTracking = await remove_user_tracking(safeHtml);
  return htmlWithNoUserTracking;
}

export function remove_harmful_code (html: string) {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: allowedTags });
}

async function remove_user_tracking (html: string) {
  // Parse the description as HTML to easily manipulate it.
  const parser = new DOMParser();

  const htmlDoc = parser.parseFromString(html, "text/html");

  remove_all_external_links(htmlDoc);
  await replace_images_with_proxied_images(htmlDoc);

  return document_to_html(htmlDoc);
}

function remove_all_external_links (htmlDoc: Document) {
  const links = htmlDoc.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#")) {
      link.removeAttribute("href");
    }
  });
}

async function replace_images_with_proxied_images (htmlDoc: Document) {
  const images = htmlDoc.querySelectorAll("img");
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
}

function document_to_html (descriptionHtml: Document) {
  const body = descriptionHtml.querySelector("body");
  const serializer = new XMLSerializer();
  let html = "";
  if (body) {
    html = serializer.serializeToString(body);
    html = html
      .replace("<body xmlns=\"http://www.w3.org/1999/xhtml\">", "")
      .replace("<body>", "")
      .replace("</body>", "");
  }
  return html;
}

// Returns true if the image is allowed to be displayed.
function isAllowedImage (href: string): boolean {
  let extension = "";
  if (href) {
    const parts = href.split(".");
    if (parts.length > 0) {
      extension = parts.pop() ?? "";
    }
  }
  extension = extension.trim();
  return allowedImageExtensions.includes(extension);
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
