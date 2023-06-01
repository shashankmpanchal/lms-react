import { ApiUtil } from './index';

class DashboardModuleApi extends ApiUtil {
  async getEmployeeLeaveCount(data, token) {
    return await this.post('leaves/list', data, token);
  }
}

export const dashboardApi = new DashboardModuleApi();