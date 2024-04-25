export interface ProfileCreationDTO {
    Title: string,
    Description: string
}

export function ProfileCreationDTOFromJSON(json: any): ProfileCreationDTO {
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