export interface User extends UserInfo {
    id: number,
    email: string,
    role: string,
    fullname: string,
}

export interface UserInfo {
    about: string,
    phone: string,
    pic: File | string,
}

// export interface Pupil extends User {
//     grade: string,
// }

// export interface Teacher extends User {
//     position: string,
// }

export interface UserModel {
    email: string,
    surname: string,
    name: string,
    patronymic: string,
    role: string,
}