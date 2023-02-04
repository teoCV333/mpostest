import { Category } from "../models/Category";
import moment from 'moment/moment';
import {Op} from 'sequelize';

const getAsyncCategories = async () => 
{
    return await Category.findAll(
        {
            attributes: [
                "id",
                "name",
                "state",
                "createdAt",
                "updatedAt"
            ]
        }
    );
}

const getAsyncCategory = async (id) => 
{
    return await Category.findByPk(
        id,
        {
            attributes: [
                "name",
                "state",
                "createdAt",
                "updatedAt"            ]
        }
        );
}

const getAsyncCategoryByName = async (name) => 
{
    return await Category.findOne(
        {
            where: {
                [Op.and]: [
                    {
                        name: name
                    },
                    {
                        state: 0
                    }
                ]
            },
        }
    );
}

const postAsyncCategory = async (category) => 
{   
    var createdDate = moment(new Date()).format('DD/MM/YYYY hh:mm:ss A');
    var updatedDate = moment(new Date()).format('DD/MM/YYYY hh:mm:ss A');;
    return await Category.create(
        {
            name: category.name,
            state: 0,
            createdAt: createdDate,
            updatedAt: updatedDate
        }
    );
}

const updateAsyncCategory = async (category) => 
{
    var updatedDate = moment(new Date()).format('YYYY/MM/DD hh:mm:ss A');;
    return await Category.update(
        {
            name: category.name,
            updatedAt: updatedDate 
        },
        {
            where: {id: category.id}
        }
    );
}

const deleteAsyncCategory = async(id) => {
    return await Category.update(
        {
            state: 1
        },
        {
            where: {
                [Op.and]: [
                    {
                      id: id  
                    },
                    {
                        state: 0
                    }
                ]
            }
                
        }
    )
}

export const methods = {
    getAsyncCategories,
    getAsyncCategory,
    getAsyncCategoryByName,
    getAsyncCategories,
    postAsyncCategory,
    updateAsyncCategory,
    deleteAsyncCategory
};
