export const objectToFormData = (obj: { [key: string]: any }): FormData => {
    const formData = new FormData();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            formData.append(key, (obj[(key)]));
        }
    }

    return formData;
}