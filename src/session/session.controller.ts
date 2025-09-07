import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SessionService } from './session.service';
import { CredentialsDto } from './dto/credentials.dto';
import { Public } from 'src/common/decorator/public.decorator';
import type { Request } from 'express';
import { AppResponse } from 'src/common/response/app.response';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Public()
  @Post()
  async signIn(@Body() credentialsDto: CredentialsDto) {
    const data = await this.sessionService.signIn(credentialsDto);
    return new AppResponse({
      statusCode: 200,
      message: 'Login realizado com sucesso',
      result: 'success',
      data,
    });
  }

  @Get('me')
  async me(@Req() req: Request) {
    const user = req.user as { id: string };

    const data = await this.sessionService.me(user.id);

    return new AppResponse({
      statusCode: 200,
      message: 'Usuário encontrado',
      result: 'success',
      data,
    });
  }

  @Get('validate')
  validate() {
    return new AppResponse({
      statusCode: 200,
      message: 'Token válido',
      result: 'success',
    });
  }
}
