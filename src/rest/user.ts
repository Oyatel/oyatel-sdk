import { BaseAPI } from './baseAPI';

export interface MeResponse {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

export type AvailabilityStatus = 'away' | 'dnd' | null;

export class User extends BaseAPI {
  async currentUser() {
    return this.request().get<MeResponse>('account/me.json');
  }

  async setAvailability(status: AvailabilityStatus) {
    return this.request().get<MeResponse>('account/setAvailability.json', {
      params: {
        availability: status,
      },
    });
  }
}
