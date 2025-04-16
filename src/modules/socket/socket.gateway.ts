import { inject, injectable } from "inversify";

import { IUserDto } from "../user/user.model";
import { SocketService } from "./socket.service";
import { TSocket } from "./socket.types";

@injectable()
export class SocketGateway {
  constructor(@inject(SocketService) private socketService: SocketService) {}

  public initialize(): void {
    this.socketService.io.on("connection", socket => {
      const user = socket.data; // Пользователь из middleware

      this.setupConnectionHandlers(socket, user);
      this.setupPresenceHandlers(socket, user);

      console.info(`Socket gateway initialized for user ${user?.id}`);
    });
  }

  private setupConnectionHandlers(socket: TSocket, user: IUserDto): void {
    // Подписываемся на комнату пользователя
    socket.join(`user_${user.id}`);

    socket.on("disconnect", () => {
      console.info(`User ${user.id} disconnected`);
    });

    socket.on("error", err => {
      console.error(`Socket error for user ${user.id}: ${err.message}`);
    });
  }

  private setupPresenceHandlers(socket: TSocket, user: IUserDto): void {
    // Уведомляем о онлайн статусе
    socket.on("online", (isOnline: boolean) => {
      this.socketService.broadcastToRoom(`user_${user.id}`, "online", {
        userId: user.id,
        isOnline,
      });
    });
  }
}
