import { ApiUtil } from './index';

class AuthModuleApi extends ApiUtil {
  async register(data) {
    return await this.post('create-employee', data);
  }

  async loginCheck(loginData) {
    return await this.post('login', loginData);
  }
}

export const authApi = new AuthModuleApi();