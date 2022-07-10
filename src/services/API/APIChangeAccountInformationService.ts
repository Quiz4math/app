import { AuthStore } from '../../stores/AuthStore';
import { DeleteAccountInterface, IChangeAccountInformationService, UpdatePasswordInterface, UpdateStudentDataInterface } from '../IChangeAccountInfomationService';
import { ApiService } from './ApiService';

const authStore = AuthStore.shared();


export class APIChangeAccountInfromationService extends ApiService implements IChangeAccountInformationService {


  async updateStudentData(studentObject: UpdateStudentDataInterface){
    if(studentObject.first_name == undefined) {
      const data = (await authStore.getAuthData()).firstName;
      studentObject.first_name = data ?? '';
    }

    if(studentObject.curriculum_id == undefined) {
      const data = (await authStore.getAuthData()).curriculumId;
      studentObject.curriculum_id = data ?? '';
    }
    await this.axios.put('/auth', {...studentObject}).then((response) => {
      console.log(response)
    }, (error) => {
      throw console.error("error");
      
    });
  }

  async updatePassword(passObj: UpdatePasswordInterface){
      await this.axios.put('/auth', {...passObj}).then((response) => {
      }, (error) =>{
        throw console.error(error);
      });
  }

 async deleteAccount(passwordObj: DeleteAccountInterface){
    await this.axios.delete('/auth',{params: passwordObj}).then((response) => {
    }, (error) =>{
      throw console.error(error);
    });
  }
}