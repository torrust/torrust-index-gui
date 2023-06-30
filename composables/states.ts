import { PublicSettings, Category, TokenResponse, TorrentTag } from "torrust-index-types-lib";
import { Rest } from "torrust-index-api-lib";
import { useRuntimeConfig, useState } from "#app";
import { notify } from "notiwind-ts";

export const useRestApi = () => useState<Rest>("rest-api", () => new Rest(useRuntimeConfig().public.apiBase));
export const useCategories = () => useState<Array<Category>>("categories", () => new Array<Category>());
export const useTags = () => useState<Array<TorrentTag>>("tags", () => new Array<TorrentTag>());
export const useAuthenticationModal = () => useState<boolean>("authentication-modal", () => false);
export const useSettings = () => useState<PublicSettings>("public-settings", () => null);
export const useUser = () => useState<TokenResponse>("user", () => null);

export function getSettings () {
  useRestApi().value.settings.getPublicSettings()
    .then((publicSettings) => {
      useSettings().value = publicSettings;
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: `Trying to get public settings. ${err.message}.`
      }, 10000);
    });
}

export function getCategories () {
  useRestApi().value.category.getCategories()
    .then((res) => {
      useCategories().value = res;
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: `Trying to get categories. ${err.message}.`
      }, 10000);
    });
}

export function getTags () {
  useRestApi().value.tag.getTags()
    .then((res) => {
      useTags().value = res;
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: `Trying to get tags. ${err.message}.`
      }, 10000);
    });
}

export async function loginUser (login: string, password: string) {
  return await useRestApi().value.user.loginUser({
    login,
    password
  })
    .then((user) => {
      useUser().value = user;
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: `Trying to login. ${err.message}.`
      }, 10000);
    });
}

export function logoutUser () {
  useUser().value = null;

  useRestApi().value.deleteToken();
}

export async function getUser () {
  if (!useRestApi().value.authToken) {
    return;
  }

  return await useRestApi().value.user.renewToken()
    .then((user) => {
      useUser().value = user;
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: `Trying to get user info. ${err.message}.`
      }, 10000);
    });
}
