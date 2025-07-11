// src/app.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  // pingTimeout: 10000,    // Time in ms before a client is considered disconnected after no pong
  // pingInterval: 25000,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private activeClients = new Set<string>();

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    this.activeClients.add(client.id);
  }

  handleDisconnect(client: Socket) {
    this.activeClients.delete(client.id);
  }

  getActiveClientCount(): number {
    return this.activeClients.size;
  }

  getActiveClientIds(): string[] {
    return Array.from(this.activeClients);
  }

  // Custom event
  //   @SubscribeMessage('message')
  //   handleMessage(client: Socket, payload: any): void {
  //     this.server.emit('message', payload); // Broadcast to all clients
  //   }

  // Custom event example
  updateDoorStatus(data: any) {
    this.server.emit('updateDoorStatus', data);
  }
  updateLockStatus(data: any) {
    this.server.emit('updateLockStatus', data);
  }
  updateRoomStatus(data: any) {
    this.server.emit('updateRoomStatus', data);
  }
  updateSupervisorCount(data: any) {
    this.server.emit('updateSupervisorCount', data);
  }
}
