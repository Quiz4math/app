import { from, Observable } from "rxjs";
import { Suggestion } from "../../models/Suggestion";
import { ApiQuizSessionGenerationService } from "../../services/API/ApiQuizSessionGenerationService";
import { IQuizSessionGenerationRepository } from "./IQuizSessionGenerationRepository";

export class QuizSessionGenerationRepository
	implements IQuizSessionGenerationRepository
{
	constructor(private service: ApiQuizSessionGenerationService) {}

	generateSuggestions(): Observable<Suggestion[]> {
		return from(this.service.generateSuggestions());
	}
}
