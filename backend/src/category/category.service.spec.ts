import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { DatabaseService } from '../service/db/db.service';
import { Category } from './entities/category.entity';

const SAMPLE_CATEGORY: Category = {
  id: 1,
  name: 'clothes',
  parent_id: null,
};

describe('CategoryService', () => {
  let service: CategoryService;
  let database: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, DatabaseService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    database = module.get<DatabaseService>(DatabaseService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of categories', async () => {
      const mockData = {
        success: true,
        data: [SAMPLE_CATEGORY, SAMPLE_CATEGORY],
      };
      jest.spyOn(database, 'query').mockResolvedValue(mockData.data);

      const result = await service.findAll();

      expect(result).toStrictEqual(mockData);
    });

    it('should rethrow if reading from database throws', async () => {
      const errorMessage = 'reading from db error';
      jest.spyOn(database, 'query').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(service.findAll()).rejects.toThrow(errorMessage);
    });
  });

  describe('findOne', () => {
    it('should return one category if exists', async () => {
      const mockData = {
        success: true,
        data: SAMPLE_CATEGORY,
      };
      jest.spyOn(database, 'query').mockResolvedValue([mockData.data]);

      const result = await service.findOne(1);

      expect(result).toStrictEqual(mockData);
    });

    it('should return null if no category with given id exists', async () => {
      const mockData = {
        success: true,
        data: null,
      };
      jest.spyOn(database, 'query').mockResolvedValue([]);

      const result = await service.findOne(-1);

      expect(result).toStrictEqual(mockData);
    });

    it('should rethrow if reading from database throws', async () => {
      const errorMessage = 'reading from db error';
      jest.spyOn(database, 'query').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(service.findOne(1)).rejects.toThrow(errorMessage);
    });
  });

  describe('create', () => {
    it('should store the new category if all is well', async () => {
      const mockData = { success: true };
      jest.spyOn(database, 'query').mockResolvedValue([]);

      const result = await service.create({ name: 'name', parent_id: 1 });

      expect(result).toStrictEqual(mockData);
    });

    it('should return appropriate response if referencing non-existent database object', async () => {
      const error = {
        code: '23503',
        constraint: 'table_column_fkey',
      };
      const mockErrorResponse = {
        success: false,
        message: `You are referencing a non-existent database object: "${error.constraint}"`,
      };
      jest.spyOn(database, 'query').mockImplementation(() => {
        throw error;
      });

      const result = await service.create({ name: 'name', parent_id: -1 });

      expect(result).toStrictEqual(mockErrorResponse);
    });

    it('should return appropriate response if trying to insert non-nullable field', async () => {
      const error = {
        code: '23502',
        column: 'name',
      };
      const mockErrorResponse = {
        success: false,
        message: `Column "${error.column}" cannot be null.`,
      };
      jest.spyOn(database, 'query').mockImplementation(() => {
        throw error;
      });

      const result = await service.create({ name: null, parent_id: 1 });

      expect(result).toStrictEqual(mockErrorResponse);
    });

    it('should rethrow other errors', async () => {
      const error = {};
      jest.spyOn(database, 'query').mockImplementation(() => {
        throw error;
      });

      await expect(
        service.create({ name: null, parent_id: 1 }),
      ).rejects.toStrictEqual(error);
    });
  });
});
