import {rest} from "~/api";
import {useRuntimeConfig} from "#app";
import {setUserWithObject, useToken} from "~/store/user";

export function setToken(token: string) {
    localStorage.setItem("Token", token);

    useToken().value = token;
}

export function deleteToken() {
    localStorage.removeItem("Token");

    useToken().value = null;
}

export async function loginUser(login: string, password: string) {
    const config = useRuntimeConfig();

    return await rest.user.loginUser(config.public.apiBase, {
        login,
        password
    })
        .then((res) => {
            setToken(res.token);
            setUserWithObject(res);
        })
}

export async function registerUser(username: string, email: string, password: string) {
    const config = useRuntimeConfig();

    return await rest.user.registerUser(config.public.apiBase, {
        username,
        email,
        password,
        confirm_password: password
    })
}
