import { NextFunction } from 'express';
import { Request, Response } from '$root/entities';
import { Directory } from './dirModel';
import { DirService } from './dirService';
import { v4 as uuid4 } from 'uuid';
import { AppError } from '$root/utils/appError';
import { SUCCESS_CODES } from '$root/constants/responseCodes';

class DirController {
    public async getAllDir(req: Request, res: Response, next: NextFunction) {
        const dirService = new DirService();
        try {
            const dirList = await dirService.getAllDir();
            return res.success(SUCCESS_CODES.READ.code, dirList);
        } catch (err: any) {
            next(new AppError(err));
        }
    }

    public async createDirectory(req: Request, res: Response, next: NextFunction) {
        const dirService = new DirService();
        const dirData: Partial<Directory> = req.body;
        const uid = uuid4();
        dirData.id = uid;
        try {
            const dirInfo = await dirService.createDirectory(dirData, req.transaction);
            return res.success(SUCCESS_CODES.CREATED.code, dirInfo);
        } catch (err: any) {
            next(new AppError(err));
        }
    }

    // Method to get a directory by ID
    public async getDirectoryById(req: Request, res: Response, next: NextFunction) {
        const dirService = new DirService();
        const dirId: string = req.params.id;
        if (dirId === "search") {
            return next();
        }
        const orderBy = req.query.orderBy;
        console.log(orderBy);
        try {
            const dir = await dirService.getDirectoryById(dirId, req.transaction);
            const childList = await dirService.getAllDirByParentId(dirId, orderBy?.toString());
            return res.success(SUCCESS_CODES.READ.code, { ...dir.dataValues, list: childList });
        } catch (err: any) {
            next(new AppError(err));
        }
    }

    // Method to update a directory by ID
    public async updateDirectoryById(req: Request, res: Response, next: NextFunction) {
        const dirService = new DirService();
        const dirId: string = req.params.id;
        const dirData: { name: string } = req.body;

        try {
            const dir = await dirService.getDirectoryById(dirId, req.transaction);
            const updateData = await dirService.updateDirectory(
                dir,
                dirData,
                req.transaction,
            );
            return res.success(SUCCESS_CODES.UPDATED.code, updateData);
        } catch (err: any) {
            next(new AppError(err));
        }
    }

    public async deleteDirectoryById(req: Request, res: Response, next: NextFunction) {
        const dirService = new DirService();
        const dirId: string = req.params.id;

        try {
            const dir = await dirService.getDirectoryById(dirId, req.transaction);
            await dirService.deleteDirectoryById(dir);
            return res.success(SUCCESS_CODES.DELETED.code, { id: dirId });
        } catch (err: any) {
            next(new AppError(err));
        }
    }

    public async searchFileAndDir(req: Request, res: Response, next: NextFunction) {
        const dirService = new DirService();
        const searchQuery = req.query.searchQuery;
        try {
            const dirList = await dirService.searchFileAndDir(searchQuery?.toString() ?? "");
            return res.success(SUCCESS_CODES.READ.code, dirList);
        } catch (err: any) {
            next(new AppError(err));
        }
    }
}

export default DirController;
