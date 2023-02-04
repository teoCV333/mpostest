import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(250)
    }
});