import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Role } from "./Role";

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    completeName: {
        type: DataTypes.STRING(250),
    },
    createdAt: {
        type: DataTypes.DATE
    },
    lastLogin: {
        type: DataTypes.DATE
    },
    password: {
        type: DataTypes.STRING(255)
    },
    state: {
        type: DataTypes.INTEGER
    },
    username: {
        type: DataTypes.INTEGER
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Role'
        }
    }
});

User.belongsTo(Role, {
    foreignKey: 'roleId'
});
