import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(250)
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    state: {
        type: DataTypes.INTEGER
    }
});