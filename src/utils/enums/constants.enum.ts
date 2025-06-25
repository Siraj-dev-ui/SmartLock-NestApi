export enum DoorStatus {
  LOCKED = 'Locked',
  UNLOCKED = 'UnLocked',
  OPEN = 'Open',
  CLOSED = 'Closed',
}

export enum RoomStatus {
  OCCUPIED = 'Occupied',
  VACANT = 'Vacant',
}

export enum RequestStatus {
  APPROVE = 'Approved',
  REJECT = 'Rejected',
  PENDING = 'Pending',
}

export enum Roles {
  ADMIN = 'Admin',
  SUPERVISOR = 'Supervisor',
  USER = 'User',
}

export const Actions = {
  LOCK_DOOR: 1,
  UNLOCK_DOOR: 2,
  DOOR_OPENED: 3,
  DOOR_CLOSED: 4,
  ROOM_OCCUPIED: 5,
  ROOM_VACANT: 6,
  COMPLETE_ACTION: 7,
};
export const ActionStatus = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  DENIED: 'Denied',
};

export const Device = {
  // ID: 'Device_E0891425BF58',
  ID: 'Device_F073AF6CDDA0',
  //   DOOR_ID: 'Device_E0891425BF58s',
  UNLOCK_DISTANCE: -60,
};

// export enum Actions
//
