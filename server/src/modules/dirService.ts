import { Directory } from './dirModel';
import { Op, Transaction } from 'sequelize';

export class DirService {
    // get All Directory
    async getAllDir(
    ): Promise<Directory[]> {
        return Directory.findAll();
    }

    // get All Directory
    async getAllDirByParentId(
        parentId: string,
        orderBy: string = 'ASC',
    ): Promise<Directory[]> {
        return Directory.findAll({
            where: { parentId },
            order: [['name', orderBy]],
        });
    }

    // Create a new Directory
    async createDirectory(
        dirPayload: Partial<Directory>,
        transaction: Transaction,
    ): Promise<Directory> {
        return Directory.create(dirPayload, { transaction });
    }

    // Read a Directory by ID
    async getDirectoryById(
        id: string,
        transaction: Transaction,
    ): Promise<Directory | undefined> {
        return Directory.findOne({ where: { id }, transaction });
    }

    // Update a Directory by ID
    async updateDirectory(
        dir: Directory,
        dirPayload: Partial<Directory>,
        transaction: Transaction,
    ): Promise<Directory | undefined> {
        dir.update(dirPayload, { transaction });
        return dir;
    }

    async deleteDirectoryById(
        dir: Directory
    ): Promise<Directory | undefined> {
        dir.destroy();
        return dir;
    }

    async searchFileAndDir(
        searchQuery: string
    ): Promise<Directory[]> {
        return Directory.findAll({
            where: {
                name: {
                    [Op.iLike]: `${searchQuery}%`
                }
            },
            order: [['name', 'ASC']],
        });
    }

}
