import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const TagList = sequelize.define('tagList', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(250)
    }
});