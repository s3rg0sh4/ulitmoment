export interface Course {
    id: number,
    name: string,
    about : string,
    pic: File | string
}

export interface AddPupil {
    id: number,
    pupilId: number
}