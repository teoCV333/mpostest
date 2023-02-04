import { Product } from '../models/Product';
import { Op } from "sequelize";
import { Category } from '../models/Category';
import { TagListProduct } from '../models/TagListProduct';
import moment from 'moment/moment';

const getAsyncProducts = async () => 
{
    try {
        return await Product.findAll(
            {
                where: {state: 0},
                attributes: [
                    "Id",
                    "name",
                    "cost",
                    "state",
                    "createdAt",
                    "updatedAt"
                ],
                include: [
                    {
                        model: Category,
                        key: 'categoryId',
                    },
                    {
                        model: TagListProduct,
                    }
                ]
            }
            );   
    } catch (error) {
        console.log(error);
        
    }
}

const getAsyncProduct = async(id) => {
    return await Product.findOne(
        {
            where: {
                [Op.and]: [
                    {
                        state: 0
                    },
                    {
                        id: id
                    }
                ]
            },
            attributes: [
                "id",
                "name",
                "cost",
                "state",
                "createdAt",
                "updatedAt"
            ],
            include: [
                {
                    model: Category,
                    key: 'categoryId',
                },
                {
                    model: TagListProduct,
                }
            ]
        }
    )
}

const getAsyncProductByName = async(name) => {
    var product =  await Product.findOne( 
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
        return product;
}

const postAsyncProduct = async(product) => {
    var createdDate = moment(new Date()).format('DD/MM/YYYY hh:mm:ss A');
    var updatedDate = moment(new Date()).format('DD/MM/YYYY hh:mm:ss A');;

    console.log(createdDate);
    return Product.create(
        {
            name: product.name,
            state: 0,
            cost: product.cost,
            createdAt: createdDate,
            updatedAt: updatedDate,
            categoryId: product.categoryId
        }
    )
}

const updateAsyncProduct = async(product) => {
    var updatedDate = moment(new Date()).format('DD/MM/YYYY hh:mm:ss A');;
    return Product.update(
        {
            name: product.name,
            state: 0,
            cost: product.cost,
            updatedAt: updatedDate,
            categoryId: product.categoryId
        },
        {
            where: {
                [Op.and]: [
                    {
                        id: product.id
                    },
                    {
                        state: 0
                    }
                ]
            },
        }
    )
}

const deleteAsyncProduct = async(id) => {
    return await Product.update(
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
    postAsyncProduct,
    getAsyncProducts,
    getAsyncProduct,
    getAsyncProductByName,
    updateAsyncProduct,
    deleteAsyncProduct
}