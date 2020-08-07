import { CometD } from 'cometd';
import { Observable } from 'rxjs';
import { OyatelEvent, PresenceEvent, QueueEvent, CallEvent } from './types';
import { OyatelClient } from '../client';

/* istanbul ignore next */
if (typeof window === 'undefined') {
  require('cometd-nodejs-client').adapt();
}

export class Events {
  private cometd: CometD;
  private client: OyatelClient;
  private baseUrl = 'https://api.oyatel.com/cometd/cometd/';

  constructor(client: OyatelClient) {
    this.cometd = new CometD();
    this.cometd.configure({ url: this.baseUrl });
    this.client = client;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  private handshake(callback: (successful: boolean) => void) {
    this.cometd.handshake(
      { ext: { oauth_token: this.client.getAccessToken(), authType: 'oauth' } },
      (m) => {
        if (m.successful) {
          return callback(true);
        }
        return callback(false);
      },
    );
  }

  onCall(): Observable<OyatelEvent<CallEvent>> {
    return new Observable((subscriber) => {
      this.handshake((successful) =>
        successful
          ? this.cometd.subscribe('/events/call', (data: OyatelEvent<CallEvent>) =>
              subscriber.next(data),
            )
          : subscriber.error(),
      );
    });
  }

  onPresenceChange(): Observable<OyatelEvent<PresenceEvent>> {
    return new Observable((subscriber) => {
      this.handshake((successful) =>
        successful
          ? this.cometd.subscribe('/events/presence', (data: OyatelEvent<PresenceEvent>) =>
              subscriber.next(data),
            )
          : subscriber.error(),
      );
    });
  }

  onQueueChange(): Observable<OyatelEvent<QueueEvent>> {
    return new Observable((subscriber) => {
      this.handshake((successful) =>
        successful
          ? this.cometd.subscribe('/events/queue', (data: OyatelEvent<QueueEvent>) =>
              subscriber.next(data),
            )
          : subscriber.error(),
      );
    });
  }
}
