import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Product } from "./Product";

export const TagListProduct = sequelize.define('tagListProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Product',   
        }
    },
    tagListId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'TagList'
        }
    }
});

