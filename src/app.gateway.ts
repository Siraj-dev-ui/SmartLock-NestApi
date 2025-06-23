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

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Custom event
  //   @SubscribeMessage('message')
  //   handleMessage(client: Socket, payload: any): void {
  //     console.log('Received message:', payload);
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
