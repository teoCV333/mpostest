
import { Role } from '../models/Role';
import { User } from '../models/User';
import { Op } from 'sequelize';
import moment from 'moment/moment';

const getAsyncAccountByUsername = async (username) => {
   return await User.findOne(
    {
        where: { 
            [Op.and]: [
                {
                    username: username
                },
                {
                    state: 0
                }
            ]
        },
        attributes: [
            "id",
            "completeName",
            "createdAt",
            "lastLogin",
            "password",
            "state",
            "username"
        ],
        include: {
            model: Role        
        }
    }
   );
}

const getAsyncUsers = async () => 
{
    try {
        return await User.findAll(
            {
                where: {state: 0},
                attributes: [
                    "id",
                    "completeName",
                    "username",
                    "password",
                    "createdAt",
                    "lastLogin",
                    "state",
                ],
                include: [
                    {
                        model: Role,
                        key: 'roleId',
                    },
                ]
            }
            );   
    } catch (error) {
        console.log(error);
        
    }
}

const getAsyncUser = async(id) => {
    return await User.findOne(
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
                "completeName",
                "username",
                "password",
                "createdAt",
                "lastLogin",
                "state",
            ],
            include: [
               {
                model: Role,
                key: 'roleId'
               }
            ]
        }
    )
}

const postAsyncUser = async (user) => {

    var createdDate = moment(new Date()).format('DD/MM/YYYY hh:mm:ss A');
    var updatedDate = moment(new Date()).format('DD/MM/YYYY hh:mm:ss A');;

    return await User.create(
        {
            completeName: user.completeName,
            password: user.password,
            state: user.state,
            username: user.username,
            createdAt: createdDate,
            lastLogin: updatedDate,
            roleId: user.roleId,
            state: 0
        }
    )
}

const updateAsyncUser = async(user) => {
    return User.update(
        {
            completeName: user.completeName,
            userName: user.userName,
            roleId: user.roleId
        },
        {
            where: {
                [Op.and]: [
                    {
                        id: user.id
                    },
                    {
                        state: 0
                    }
                ]
            },
        }
    )
}

const deleteAsyncUser = async(id) => {
    return await User.update(
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



export const methods = 
{
    getAsyncAccountByUsername,
    getAsyncUsers,
    getAsyncUser,
    postAsyncUser,
    updateAsyncUser,
    deleteAsyncUser
};