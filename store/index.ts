import {useState} from "#app";
import {TorrentCategory} from "torrust-index-types-lib";

export const useCategories = () => useState<Array<TorrentCategory>>('categories', () => new Array<TorrentCategory>())
export const useAuthenticationModal = () => useState<boolean>('authentication-modal', () => false)
