// import { of } from "rxjs"
import { Events } from '../events';
import { OyatelClient } from '../../client';

const types = {
  '/events/call': {
    channel: '/events/call/',
    data: { event: 'calling' },
  },
  '/events/presence': {
    channel: '/events/presence/',
    data: { event: 'presence' },
  },
  '/events/queue': {
    channel: '/events/queue/',
    data: { event: 'queue' },
  },
};

jest.mock('cometd', () => ({
  CometD: jest.fn().mockImplementation(() => ({
    configure: () => {},
    handshake: (_: any, m: (status: any) => any) => {
      m({ successful: true });
    },
    subscribe: (type, callback) => {
      callback(types[type]);
    },
  })),
}));

describe('events', () => {
  let events = new Events(new OyatelClient(''));

  beforeEach(() => {
    events = new Events(new OyatelClient(''));
  });

  it('should be possible to get base url', () => {
    const url = events.getBaseUrl();
    expect(url).toBe('https://api.oyatel.com/cometd/cometd/');
  });

  it('should be possible to set base url', () => {
    const newUrl = 'http://oyatel.com';
    events.setBaseUrl(newUrl);
    const url = events.getBaseUrl();
    expect(url).toBe(newUrl);
  });

  it('should return call events', (done) => {
    events.onCall().subscribe((o) => {
      expect(o.channel).toBe('/events/call/');
      expect(o.data.event).toBe('calling');
      done();
    });
  });

  it('should return presence events', (done) => {
    events.onPresenceChange().subscribe((o) => {
      expect(o.channel).toBe('/events/presence/');
      expect(o.data.event).toBe('presence');
      done();
    });
  });

  it('should return queue events', (done) => {
    events.onQueueChange().subscribe((o) => {
      expect(o.channel).toBe('/events/queue/');
      expect(o.data.event).toBe('queue');
      done();
    });
  });
});
