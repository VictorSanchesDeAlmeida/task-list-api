import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import AppError from '../response/app.error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError({
        message: 'Cabeçalho de autorização inválido',
        statusCode: 401,
        error: 'Unauthorized',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AppError({
        message: 'Token não fornecido',
        statusCode: 401,
        error: 'Unauthorized',
      });
    }

    const secret =
      this.configService.get<string>('JWT_SECRET') || 'defaultSecretKey';

    try {
      const decoded = jwt.verify(token, secret);
      request.user = decoded;
      return true;
    } catch {
      throw new AppError({
        message: 'Token inválido ou expirado',
        statusCode: 401,
        error: 'Unauthorized',
      });
    }
  }
}
