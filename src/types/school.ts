export interface School {
    id: number,
    name: string,
    address: string,
    phone: string
}

export interface AddSchoolRequest {
    name: string,
    address: string,
    phone: string
}