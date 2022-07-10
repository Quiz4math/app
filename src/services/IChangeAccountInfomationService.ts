export interface UpdateStudentDataInterface {
  current_password: string;
  first_name?: string;
  last_name?: string;
  curriculum_id?: string;
}

export interface UpdatePasswordInterface{
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface DeleteAccountInterface{
  current_password:string;
}

export interface IChangeAccountInformationService {
    updateStudentData(studentObject: UpdateStudentDataInterface): Promise<void>; 
    updatePassword(passwordsObject: UpdatePasswordInterface): Promise<void>;
    deleteAccount(passwordObj: DeleteAccountInterface): Promise<void>;
}