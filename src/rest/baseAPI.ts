import { OyatelClient } from '../client';
import axios from 'axios';

export class BaseAPI {
  private client: OyatelClient;
  private baseUrl = 'https://rest.oyatel.com/';

  constructor(client: OyatelClient) {
    this.client = client;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  request() {
    return axios.create({
      baseURL: this.baseUrl,
      method: 'GET',
      params: {
        oauth_token: this.client.getAccessToken(),
      }
    });
  }
}
