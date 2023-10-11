import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './dto/role.enum';
import { ROLES_KEY } from './dto/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const user = context.switchToHttp().getRequest();
    const userRole = user.user.role;
    console.log({ userRole, requiredRoles });
    return requiredRoles.some((role) => userRole?.includes(role));
  }
}
