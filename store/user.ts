import {useState} from "#app";
import {User} from "torrust-index-types-lib";

export const useUser = () => useState<User>('user', () => null)
export const useToken = () => useState<string>('token', () => null)

export function setUserWithObject(userObject: Object) {
    let user = new User();

    Object.assign(user, userObject);

    useUser().value = user;

    saveUserToLocalStorage();
}

export function loadUserFromLocalStorage(): boolean {
    const user_json = localStorage.getItem('torrust_user');

    if (!user_json || user_json === "undefined") return false;

    let userObject = JSON.parse(user_json);

    setUserWithObject(userObject);

    return true;
}

export function saveUserToLocalStorage() {
    localStorage.setItem('torrust_user', JSON.stringify(useUser().value));
}

export function isUserLoggedIn(): boolean {
    return !!useUser().value?.username;
}

export function logout() {
    useUser().value = null;
    saveUserToLocalStorage();
}
