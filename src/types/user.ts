export interface User {
    email: string,
    role: string,
    pic: File,
    about: string,
    surname: string,
    name: string,
    patronymic: string,

}

export interface Pupil extends User {
    grade: string,
}

export interface Teacher extends User {
    position: string,
}