import {useState} from "#app";
import {User} from "torrust-index-types-lib";

export const useUser = () => useState<User>('user', () => new User())

export function setUserWithObject(userObject: Object) {
    let user = new User();

    Object.assign(user, userObject);

    useUser().value = user;
}

export function loadUserFromLocalStorage(): boolean {
    const user_json = localStorage.getItem('torrust_user');

    if (!user_json || user_json === "undefined") return false;

    let userObject = JSON.parse(user_json);

    setUserWithObject(userObject);

    return true;
}

export function isUserLoggedIn(): boolean {
    return !!useUser().value.username;
}

// export async function login(data: any): Promise<boolean> {
//     return await fetch('/user/login', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//         .then(async (data) => {
//             data = await data.json();
//
//             if (data['data']) {
//                 setUserWithObject(data['data']);
//             }
//
//             return true;
//         })
//         .catch(err => {
//             return false;
//         });
// }
