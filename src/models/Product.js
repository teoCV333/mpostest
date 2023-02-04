import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Category } from "./Category";
import { TagListProduct } from "./TagListProduct";

export const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cost: {
        type: DataTypes.FLOAT(250),
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    name: {
        type: DataTypes.STRING(255)
    },
    state: {
        type: DataTypes.INTEGER
    },
   
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category'
        }
    }
});

Product.belongsTo(Category, {
    foreignKey: 'categoryId'
});
Product.hasMany(TagListProduct, {
    foreignKey: 'productId'
});
