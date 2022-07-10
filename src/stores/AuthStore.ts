import { LoginResult } from '../services/IAuthService';
import { CachedSecureStore } from './CachedSecuredStore';
import { AuthData, IAuthStore } from './IAuthStore';
enum Keys {
  UID = 'auth_uid',
  CLIENT = 'auth_client',
  ACCESS_TOKEN = 'auth_access_token',
  EXPIRY = 'auth_expiry',
  ID = 'auth_id',
  FIRST_NAME = 'auth_first_name',
  LAST_NAME = 'auth_last_name',
  FULL_NAME = 'auth_full_name',
  EMAIL = 'auth_email',
  ROLE = 'auth_role',
  CURRICULUM_ID = 'auth_curriculum_id',
  CURRICULUM_NAME = 'auth_curriculum_name',
}

export class AuthStore implements IAuthStore {
  private store = new CachedSecureStore();

  async getAuthData(): Promise<AuthData> {
    const [
      uid,
      client,
      accessToken,
      expiry,
      id,
      firstName,
      lastName,
      fullName,
      email,
      role,
      curriculumId,
      curriculumName,
    ] = await Promise.all([
      this.store.getItemAsync(Keys.UID),
      this.store.getItemAsync(Keys.CLIENT),
      this.store.getItemAsync(Keys.ACCESS_TOKEN),
      this.store.getItemAsync(Keys.EXPIRY),
      this.store.getItemAsync(Keys.ID),
      this.store.getItemAsync(Keys.FIRST_NAME),
      this.store.getItemAsync(Keys.LAST_NAME),
      this.store.getItemAsync(Keys.FULL_NAME),
      this.store.getItemAsync(Keys.EMAIL),
      this.store.getItemAsync(Keys.ROLE),
      this.store.getItemAsync(Keys.CURRICULUM_ID),
      this.store.getItemAsync(Keys.CURRICULUM_NAME)
    ]);

    return {
      uid,
      client,
      accessToken,
      expiry,
      id,
      firstName,
      lastName,
      fullName,
      email,
      role,
      curriculumId,
      curriculumName,
    };
  }

  private static _shared?: AuthStore;

  static shared(): AuthStore {
    if (this._shared == null) {
      this._shared = new AuthStore();
    }

    return this._shared;
  }

  async setFromLoginResult(loginResult: LoginResult): Promise<void> {
    await Promise.all([
      this.store.setItemAsync(Keys.UID, loginResult.uid),
      this.store.setItemAsync(Keys.CLIENT, loginResult.client),
      this.store.setItemAsync(Keys.ACCESS_TOKEN, loginResult.accessToken),
      this.store.setItemAsync(Keys.EXPIRY, loginResult.expiry),
      this.store.setItemAsync(Keys.ID, loginResult.id.toString()),
      this.store.setItemAsync(Keys.FIRST_NAME, loginResult.firstName),
      this.store.setItemAsync(Keys.LAST_NAME, loginResult.lastName),
      this.store.setItemAsync(Keys.FULL_NAME, loginResult.fullName),
      this.store.setItemAsync(Keys.EMAIL, loginResult.email),
      this.store.setItemAsync(Keys.ROLE, loginResult.role),
      this.store.setItemAsync(Keys.CURRICULUM_ID, loginResult.curriculum.id.toString()),
      this.store.setItemAsync(Keys.CURRICULUM_NAME, loginResult.curriculum.name),
    ]);
  }

  async setFromUpdateDataCurriculum(curriculumId: string){
    await Promise.all([
      this.store.setItemAsync(Keys.CURRICULUM_ID, curriculumId),
    ]);
  }
  async setFromUpdateDataName(firstName: string){
    await Promise.all([
      this.store.setItemAsync(Keys.FIRST_NAME, firstName),
    ]);
  }

  clear(): void {
    this.store.deleteItemAsync(Keys.UID);
    this.store.deleteItemAsync(Keys.CLIENT);
    this.store.deleteItemAsync(Keys.ACCESS_TOKEN);
    this.store.deleteItemAsync(Keys.EXPIRY);
    this.store.deleteItemAsync(Keys.ID);
    this.store.deleteItemAsync(Keys.FIRST_NAME);
    this.store.deleteItemAsync(Keys.LAST_NAME);
    this.store.deleteItemAsync(Keys.FULL_NAME);
    this.store.deleteItemAsync(Keys.EMAIL);
    this.store.deleteItemAsync(Keys.ROLE);
    this.store.deleteItemAsync(Keys.CURRICULUM_ID);
    this.store.deleteItemAsync(Keys.CURRICULUM_NAME);
  }
}
