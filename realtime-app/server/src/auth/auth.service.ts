// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class AuthService {
  private readonly users = [
    { username: 'harshsharma', password: 'harsh' },
    { username: 'yashsharma', password: 'yash' },
    // Add more users as needed
  ];

  constructor(private readonly jwtService: JwtService) {}

  loginUser(username: string, password: string): string | null {
    const user = this.users.find((u) => u.username === username && u.password === password);

    if (user) {
      const payload = { username: user.username, sub: user.username };
      console.log(payload)
      return this.jwtService.sign(payload); // Use the secret from JwtModule
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  isSocketAuthenticated(socket: Socket): boolean {
    // Add your socket authentication logic here
    // You may check for a valid token in the socket's handshake or another secure mechanism
    return true; // Placeholder, update as needed
  }
}
