import { Survey } from "@/models/Survey";
import { SurveyCreationDTO } from "@/models/dto/surveyCreationDTO";

const CurrentSurveys: Survey[] = [
    {
        ID: "1",
        Title: "Encuesta 1",
        PrivateDescription: "Esta encuesta es la primera",
        PublicDescription: "Algo algo algo",
        Profiles: [ "1", "2" ],
        Questions: [ "1", "2", "3" ]
    },
    {
        ID: "2",
        Title: "Encuesta 2",
        PrivateDescription: "Esta encuesta es para la dependencia",
        PublicDescription: "Algo algo algo",
        Profiles: [],
        Questions: [ "4" ]
    }
]

export async function GetAllSurveys() {
    return CurrentSurveys;
}

export async function GetSurvey(id: string) {
    return CurrentSurveys.find(x => x.ID === id)
}

export async function AddSurvey(dto: SurveyCreationDTO) {
    const maxID = Math.max(...CurrentSurveys.map(x => parseInt(x.ID)))

    const survey: Survey = {
        ID: (maxID+1).toString(),
        Title: dto.Title,
        PrivateDescription: dto.PrivateDescription,
        PublicDescription: dto.PublicDescription,
        Profiles: [],
        Questions: []
    }

    CurrentSurveys.push(survey);

    return survey;
}