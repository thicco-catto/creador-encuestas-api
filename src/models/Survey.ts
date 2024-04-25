import { Profile } from "./Profile";
import { Question } from "./Question";

export interface Survey {
    ID : string,
    Title : string,
    PrivateDescription : string,
    PublicDescription : string,
    Profiles: string[],
    Questions: string[]
}