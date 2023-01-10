<template>
  <div
      class="flex flex-row"
  >
    <template v-if="user?.username">
      <div class="relative inline-block text-left">
        <div>
          <button
              class="group px-2 h-10 flex flex-row flex-nowrap justify-center items-center font-bold text-sm text-themeText capitalize border-tertiary rounded-xl cursor-pointer duration-500"
              :class="{ 'text-themeText/60': !dropdownOpened, 'border-tertiary/50': !dropdownOpened }"
              @click="dropdownOpened = !dropdownOpened"
              @mouseover="dropdownOpened = true"
          >
            <UserCircleIcon
                class="ml-1 mr-1.5 w-5 text-themeText/40"
                aria-hidden="true"
            />
            <span>{{ user.username }}</span>
          </button>
        </div>

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
          <template v-if="dropdownOpened">
            <div
                class="absolute right-0 top-10 z-10 mt-2 w-56 bg-secondary rounded-2xl drop-shadow"
                @mouseleave="dropdownOpened = false"
            >
              <ul class="p-3 text-themeText font-medium">
                <li @click="logoutUser" class="p-3 w-full inline-flex items-center hover:bg-tertiary/50 rounded-2xl cursor-pointer duration-200">
                  <span class="flex flex-nowrap whitespace-nowrap">Logout</span>
                </li>
              </ul>
            </div>
          </template>
        </transition>
      </div>
    </template>

<!--    <span-->
<!--      v-if="user?.username"-->
<!--      id="profile-button"-->
<!--      class="px-4 h-10 inline-flex justify-center items-center appearance-none bg-gradient-to-bl from-tertiary to-secondary hover:bg-tertiary text-sm text-themeText/50 hover:text-themeText text-sm text-themeText font-medium rounded-2xl cursor-pointer duration-200"-->
<!--      @click="dropdownOpened = !dropdownOpened"-->
<!--      @mouseleave="dropdownOpened = false"-->
<!--    >-->
<!--      <UserCircleIcon class="w-5 mr-2 opacity-50" />-->
<!--      <span class="flex flex-nowrap whitespace-nowrap">{{ user.username }}</span>-->
<!--      <ChevronDownIcon-->
<!--        class="w-5 ml-1 opacity-50"-->
<!--        aria-hidden="true"-->
<!--      />-->
<!--      <div-->
<!--        class="absolute pt-48 z-10"-->
<!--        :class="{hidden: !dropdownOpened}"-->
<!--      >-->
<!--        <div class="w-48 divide-y bg-secondary rounded-2xl overflow-hidden drop-shadow-lg" @click.prevent="dropdownOpened = false">-->
<!--          <ul class="text-sm text-themeText/50 font-medium duration-200">-->
<!--            <li class="p-4 w-full hover:bg-tertiary hover:text-themeText duration-200">-->
<!--              <router-link to="/admin/settings/general" replace class="inline-flex items-center">-->
<!--                <span class="flex flex-nowrap whitespace-nowrap">Settings</span>-->
<!--              </router-link>-->
<!--            </li>-->
<!--            <li class="p-4 w-full hover:bg-tertiary hover:text-themeText duration-200">-->
<!--              <a class="inline-flex items-center" @click="logoutUser()">-->
<!--                <span class="flex flex-nowrap whitespace-nowrap">Sign Out</span>-->
<!--              </a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->
<!--    </span>-->

    <button
      v-else
      id="sign-in-button"
      class="px-4 h-10 inline-flex justify-center items-center self-start appearance-none bg-gradient-to-bl from-tertiary to-secondary hover:bg-tertiary text-sm text-themeText/50 hover:text-themeText font-medium rounded-2xl shadow-lg shadow-transparent hover:shadow-secondary/50 cursor-pointer duration-1000"
      @click="login"
    >
      <UserCircleIcon class="mr-3 w-5 h-5 text-themeText/50" />
      <span class="flex flex-nowrap whitespace-nowrap">Sign in</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon } from "@heroicons/vue/20/solid";
import { Ref } from "vue";
import { ref, useAuthenticationModal, useUser, logoutUser } from "#imports";

const authModalOpen = useAuthenticationModal();
const user = useUser();

const dropdownOpened: Ref<boolean> = ref(false);

function login () {
  authModalOpen.value = true;
}
</script>

<style scoped>

</style>
