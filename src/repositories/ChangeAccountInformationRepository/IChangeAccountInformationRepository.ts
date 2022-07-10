import { Observable } from 'rxjs';
import { RequestState } from '../../services/API/ApiService';
import { DeleteAccountInterface, UpdatePasswordInterface, UpdateStudentDataInterface } from '../../services/IChangeAccountInfomationService';

export interface IChangeAccountInformationRepository {
  updateCurriculum(pedioId: string): void;
  updateName(name: string): void;
  changeStudentData(studentObject: UpdateStudentDataInterface): Observable<RequestState<void>>;
  updatePassword(passwordsObject: UpdatePasswordInterface): Observable<RequestState<void>>;
  deleteAccount(passwordObject: DeleteAccountInterface): Observable<RequestState<void>>;
}