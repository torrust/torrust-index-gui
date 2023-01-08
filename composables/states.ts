import {useRuntimeConfig, useState} from "#app"
import {PublicSettings, TorrentCategory, User} from "torrust-index-types-lib"
import {Rest} from "torrust-index-api-lib"

export const useRestApi = () => useState<Rest>('rest-api', () => new Rest(useRuntimeConfig().public.apiBase))
export const useCategories = () => useState<Array<TorrentCategory>>('categories', () => new Array<TorrentCategory>())
export const useAuthenticationModal = () => useState<boolean>('authentication-modal', () => false)
export const useSettings = () => useState<PublicSettings>('public-settings', () => null)
export const useUser = () => useState<User>('user', () => null)

export function getSettings() {
    useRestApi().value.settings.getPublicSettings()
        .then((publicSettings) => {
            useSettings().value = publicSettings
        })
}

export function getCategories() {
    useRestApi().value.category.getCategories()
        .then((res) => {
            useCategories().value = res;
        })
}

export async function loginUser(login: string, password: string) {
    return await useRestApi().value.user.loginUser({
        login,
        password
    })
        .then((user) => {
            useUser().value = user
        })
}

export function logoutUser() {
    useUser().value = null

    useRestApi().value.deleteToken()
}

export async function downloadTorrent(torrentId: number, fileName?: string) {
    if (fileName == undefined) {
        fileName = "torrent";
    }

    useRestApi().value.torrent.downloadTorrent(torrentId)
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.torrent`);
            document.body.appendChild(link);
            link.click();
        });
}