export interface User {
    id: number,
    email: string,
    role: string,
    about: string,
    fullname: string,
    pic: File | string,

}

export interface Pupil extends User {
    grade: string,
}

export interface Teacher extends User {
    position: string,
}

export interface UserModel {
    email: string,
    surname: string,
    name: string,
    patronymic: string,
    role: string,
}