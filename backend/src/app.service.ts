import { Injectable } from '@nestjs/common';
import { DatabaseService } from './service/db/db.service';
import { FileSystemService } from './service/fs/fs.service';
import { Result } from './type/utils';

@Injectable()
export class AppService {
  constructor(
    private readonly database: DatabaseService,
    private readonly fileSystem: FileSystemService,
  ) { }

  async seedDatabase(): Promise<Result> {
    try {
      const seedQueryString = await this.fileSystem.readFile(
        `${__dirname}/../src/service/db/db.seed.sql`,
      );
      if (!seedQueryString.success) return seedQueryString;

      await this.database.query(seedQueryString.data);
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: `Seeding database resulted in error: "${error}"`,
      };
    }
  }

  async getHello(): Promise<string> {
    const result = await this.database.query('SELECT * FROM category');
    console.log('result is', result);
    return 'Hello World!';
  }
}
