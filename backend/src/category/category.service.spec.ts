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
});
