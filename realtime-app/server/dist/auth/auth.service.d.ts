import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
export declare class AuthService {
    private readonly jwtService;
    private readonly users;
    constructor(jwtService: JwtService);
    loginUser(username: string, password: string): string | null;
    isSocketAuthenticated(socket: Socket): boolean;
}
