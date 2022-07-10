import { Observable } from "rxjs";
import { Suggestion } from "../../models/Suggestion";

export interface IQuizSessionGenerationRepository {
	generateSuggestions(): Observable<Suggestion[]>;
}
