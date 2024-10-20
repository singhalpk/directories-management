import { DataTypes, Model } from 'sequelize';
import { sequelize } from '$root/sequelize';

export const DirectoryType = {
    DIRECTORY: "directory",
    FILE: "file",
}

class Directory extends Model {
    public id!: string;
    public name?: string;
    public parentId?: string;
    public type?: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Directory.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parentId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: DirectoryType.DIRECTORY
        },
    },
    {
        sequelize,
        tableName: 'directories',
    },
);

export { Directory };
