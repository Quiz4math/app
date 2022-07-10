import { Observable } from "rxjs";
import { Curriculum } from "../../models/Curriculum";
import { RequestState } from "../../services/API/ApiService";
import { ICurriculumService } from "../../services/ICurriculumService";
import { ServiceExecutor } from "../ServiceExecutor";
import { ICurriculumRepository } from "./ICurriculumRepository";

export class CurriculumRepository implements ICurriculumRepository {
	constructor(
		private serviceExecutor: ServiceExecutor,
		private curriculumService: ICurriculumService
	) {}

	getCurriculums(): Observable<RequestState<Curriculum[]>> {
		return this.serviceExecutor.performRequest(() =>
			this.curriculumService.getCurriculums()
		);
	}
}
