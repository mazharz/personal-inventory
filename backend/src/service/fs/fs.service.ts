import { readFile } from 'fs/promises';
import { Result } from '../../type/utils';

class FileSystemService {
  async readFile(path: string): Promise<Result<string>> {
    try {
      const result = await readFile(path);
      return {
        success: true,
        data: Buffer.from(result).toString(),
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: `Reading file "${path}" from disk resulted in error.`,
      };
    }
  }
}

export { FileSystemService };
