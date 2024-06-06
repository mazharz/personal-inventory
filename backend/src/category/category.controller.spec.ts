import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../service/db/db.service';

const SAMPLE_CATEGORY: Category = {
  id: 1,
  name: 'clothes',
  parent_id: null,
};

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const resMock = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as any as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, DatabaseService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return received data with ok status', async () => {
      const mockData = {
        success: true,
        data: [SAMPLE_CATEGORY, SAMPLE_CATEGORY],
      };
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(mockData));

      await controller.findAll(resMock);

      expect(resMock.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(resMock.send).toHaveBeenCalledWith(mockData);
    });

    it('should return error message with server error status', async () => {
      const error = new Error('abcd');
      jest.spyOn(service, 'findAll').mockImplementation(() => {
        throw error;
      });

      await controller.findAll(resMock);

      expect(resMock.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(resMock.send).toHaveBeenCalledWith({
        success: false,
        message: String(error),
      });
    });

    describe('findOne', () => {
      it('should return valid object if all is well', async () => {
        const mockData = {
          success: true,
          data: SAMPLE_CATEGORY,
        };
        jest.spyOn(service, 'findOne').mockResolvedValue(mockData);

        await controller.findOne(resMock, '1');

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.OK);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });

      it('should return invalid response if id is not provided', async () => {
        const mockData = {
          success: false,
          message: 'You must provide a valid id.',
        };
        jest.spyOn(service, 'findOne').mockResolvedValue(mockData);

        await controller.findOne(resMock, undefined);

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });

      it('should return invalid response if id is not number', async () => {
        const mockData = {
          success: false,
          message: 'You must provide a valid id.',
        };
        jest.spyOn(service, 'findOne').mockResolvedValue(mockData);

        await controller.findOne(resMock, 'not-a-number');

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });
    });

    describe('create', () => {
      it('should create new category if all is well', async () => {
        const mockData = { success: true };
        jest.spyOn(service, 'create').mockResolvedValue(mockData);

        await controller.create(resMock, { name: 'name', parent_id: 1 });

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.OK);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });

      it('should create new category if parent_id is null', async () => {
        const mockData = { success: true };
        jest.spyOn(service, 'create').mockResolvedValue(mockData);

        await controller.create(resMock, { name: 'name', parent_id: null });

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.OK);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });

      it('should fail if there is no payload', async () => {
        const mockData = {
          success: false,
          message: 'Make sure you provide a payload.',
        };
        jest.spyOn(service, 'create').mockResolvedValue(mockData);

        await controller.create(resMock, undefined);

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });

      it('should fail if name is not given', async () => {
        const mockData = {
          success: false,
          message: 'Make sure you provide a valid category name.',
        };
        jest.spyOn(service, 'create').mockResolvedValue(mockData);

        await controller.create(resMock, { parent_id: 1 } as any);

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });

      it('should fail if name has zero length', async () => {
        const mockData = {
          success: false,
          message: 'Make sure name is not empty.',
        };
        jest.spyOn(service, 'create').mockResolvedValue(mockData);

        await controller.create(resMock, { name: '', parent_id: 1 } as any);

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });

      it('should fail if parent_id is not given', async () => {
        const mockData = {
          success: false,
          message: 'Make sure you provide a valid category parent_id.',
        };
        jest.spyOn(service, 'create').mockResolvedValue(mockData);

        await controller.create(resMock, { name: 'name' } as any);

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });

      it('should fail if parent_id is not a number', async () => {
        const mockData = {
          success: false,
          message: 'Make sure you provide a valid category parent_id.',
        };
        jest.spyOn(service, 'create').mockResolvedValue(mockData);

        await controller.create(resMock, {
          name: 'name',
          parent_id: 'string-here' as any as number,
        });

        expect(resMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(resMock.send).toHaveBeenCalledWith(mockData);
      });
    });
  });
});
