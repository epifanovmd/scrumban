import { Server, Socket as SocketIO } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { IUserDto } from "../user/user.model";

export interface ISocketEvents {
  online: (...args: [isOnline: boolean]) => void;
}

export interface ISocketEmitEvents {
  authenticated: (...args: [{ userId: string }]) => void;
  auth_error: (...args: [{ message: string }]) => void;
  online: (...args: [{ userId: string; isOnline: boolean }]) => void;
}

export type TSocket = SocketIO<
  ISocketEvents,
  ISocketEmitEvents,
  DefaultEventsMap,
  IUserDto
>;

export type TServer = Server<
  ISocketEvents,
  ISocketEmitEvents,
  DefaultEventsMap,
  IUserDto
>;
