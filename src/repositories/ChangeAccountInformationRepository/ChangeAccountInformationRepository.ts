import { Observable } from 'rxjs';
import { RequestState } from '../../services/API/ApiService';
import { IChangeAccountInformationService, UpdatePasswordInterface, UpdateStudentDataInterface } from '../../services/IChangeAccountInfomationService';
import { AuthStore } from '../../stores/AuthStore';
import { ServiceExecutor } from '../ServiceExecutor';
import { IChangeAccountInformationRepository } from './IChangeAccountInformationRepository';
  const authStore = AuthStore.shared();
  
  

  export class ChangeAccountInformationRepository implements IChangeAccountInformationRepository {
    constructor(
      private serviceExecutor: ServiceExecutor,
      private changeAccountInformation:  IChangeAccountInformationService,
    ) {}

    changeStudentData(studentObject: UpdateStudentDataInterface): Observable<RequestState<void>> {
      return this.serviceExecutor.performRequest(() =>
        this.changeAccountInformation.updateStudentData(studentObject)
      );
    }

    updateCurriculum = ((curriculumId: string) => {
      authStore.setFromUpdateDataCurriculum(curriculumId)
    });

    updateName = (name: string) => {
      authStore.setFromUpdateDataName(name);
    }

    updatePassword(passwordsObject: UpdatePasswordInterface): Observable<RequestState<void>> {
      return this.serviceExecutor.performRequest(() =>
        this.changeAccountInformation.updatePassword(passwordsObject)
      );
    }

    deleteAccount(passwordObj: UpdatePasswordInterface): Observable<RequestState<void>> {
      return this.serviceExecutor.performRequest(() =>
        this.changeAccountInformation.deleteAccount(passwordObj)
      );
    }
  }
  