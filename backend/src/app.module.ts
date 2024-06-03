import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './service/db/db.service';
import { FileSystemService } from './service/fs/fs.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoryModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, FileSystemService],
})
export class AppModule { }
