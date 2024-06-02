import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('seed')
  async seedDatabase() {
    const result = await this.appService.seedDatabase();

    if (!result.success) {
      throw result;
    }

    return result;
  }

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
