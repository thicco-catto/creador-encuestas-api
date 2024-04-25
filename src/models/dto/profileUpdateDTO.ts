export interface ProfileUpdateDTO {
    Title: string,
    Description: string
}

export function ProfileUpdateDTOFromJSON(json: any): ProfileUpdateDTO {
    const title = json["Title"];
    const desc = json["Description"];

    if(!title || !desc) {
        throw TypeError;
    }

    return {
        Title: title,
        Description: desc
    }
}