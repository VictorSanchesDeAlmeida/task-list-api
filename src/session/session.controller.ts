import { Body, Controller, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() credentialsDto: CredentialsDto) {
    const data = await this.sessionService.signIn(credentialsDto);
    return data;
  }
}
