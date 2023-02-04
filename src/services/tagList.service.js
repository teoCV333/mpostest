
import { TagList } from '../models/TagList';

const getAsyncTagListByName = async (name) => {
   return await TagList.findOne(
    {
        where: { 
            name: name
        },
        attributes: [
            "id",
            "name"
        ]
    } 
   );
}

const getAsyncTagLists = async () => 
{
    try {
        return await TagList.findAll(
            {
                attributes: [
                    "id",
                    "name",
                ]
            }
            );   
    } catch (error) {
        console.log(error);
        
    }
}

const getAsyncTagList = async(id) => {
    return await TagList.findOne(
        {
            where: {
                id: id
            },
            attributes: [
                "id",
               "name",
            ]
        }
    )
}

const postAsyncTagList = async (tagList) => {

    return await TagList.create(
        {
            name: tagList.name
        }
    )
}

const updateAsyncTagList = async(tagList) => {
    return TagList.update(
        {
            name: tagList.name,
        },
        {
            where: {
                id: tagList.id
            },
        }
    )
}

const deleteAsyncTagList = async(id) => {
    return await TagList.destroy(
        {
            where: {
                id: id  
            }
        }
    )
}


export const methods = 
{
    getAsyncTagListByName,
    getAsyncTagLists,
    getAsyncTagList,
    postAsyncTagList,
    updateAsyncTagList,
    deleteAsyncTagList
};