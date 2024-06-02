import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './service/db/db.service';
import { FileSystemService } from './service/fs/fs.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, DatabaseService, FileSystemService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      jest
        .spyOn(appService, 'getHello')
        .mockImplementation(() => Promise.resolve('Hello World!'));
      expect(await appController.getHello()).toBe('Hello World!');
    });
  });
});
