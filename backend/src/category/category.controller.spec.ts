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
  });
});
