import { ApiUtil } from './index';

class LeaveModuleApi extends ApiUtil {
  async getLeaveList(data, token) {
    return await this.post('leaves/list', data, token);
  }

  async getLeaveDetailById(id = '', token) {
    return await this.get(`leaves/${id}`, token);
  }

  async applyEmployeeLeave(data, token) {
    return await this.post('apply-leave', data, token);
  }

  async updateEmployeeLeave(data, token) {
    return await this.post('leaves/update', data, token);
  }

  async updateLeaveStatus(data, token) {
    return await this.post('leaves/leave_status/update', data, token);
  }

  async deleteEmployeeLeave(id = '', token) {
    return await this.delete(`leaves/${id}`, token);
  }
}

export const leaveApi = new LeaveModuleApi();