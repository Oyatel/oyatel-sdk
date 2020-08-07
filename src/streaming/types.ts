export interface OyatelEvent<T> {
  channel: string;
  data: T;
}

export type CallEventType = 'calling' | 'pickup' | 'hangup';
export type CallEventDirection = 'in' | 'up';

export interface CallEventCallerId {
  number: string;
  name: string;
}

export interface CallEvent {
  // Call ID
  id: string;

  // Type of Call Event
  event: CallEventType;

  // Direction
  direction: CallEventDirection;

  // userId
  userId?: number;

  // The total time in seconds the call has
  // been connected between both parties (only on hangup)
  // This is the time being invoiced from Oyatel.
  billSec: number;

  // Billing seconds plus the time in seconds the call was
  // ringing before the receiving party picked up the call.
  duration: number;

  callerId: CallEventCallerId;
}

export type PresenceEvent = PresenceFulldumpEvent | PresenceStatusChangeEvent;

export interface PresenceFulldumpEvent {
  // Type of Presence Event
  event: 'fulldump';
  events?: PresenceStatusChangeEvent[];
}

export type PresenceStatusChangeState = 'UNAVAILABLE' | 'AVAILABLE' | 'BUSY';

export interface PresenceStatusChangeEvent {
  event: 'statuschange';
  // Firstname of the user that had availability status changed.
  firstname: string;
  // Lastname of the user that had availability status changed.
  lastname: string;

  state: PresenceStatusChangeState;

  // ID of the user that had availability status changed.
  userAccountId: number;
}

export type QueueEvent = QueueFulldumpEvent | QueueStatusChangeEvent;

export interface QueueFulldumpEvent {
  event: 'fulldump';
  events?: QueueStatusChangeEvent[];
}

export interface QueueStatusChangeEvent {
  event: 'statuschange';
  // ID of the queue
  queueId: string;
  // Array of id of useraccount that is member of queue.
  members: string[];
  callCompleted: number;
  callsAbandoned: number;
  callsWaiting: number;

  // Number of agents that are considered to be “online”,
  // or able to receive new calls, in the queue. Currently
  // interprets members with DND enabled to be “online”,
  // which might change in an upgrade.
  agentsOnline: number;

  // Number of agents that are considered to be “online”,
  // or able to receive new calls, in the queue AND is
  // currently on the phone. The call does not need to
  // be originated from the queue and will show the agent
  // as busy for any call he might be in.
  agentsBusy: number;
}
