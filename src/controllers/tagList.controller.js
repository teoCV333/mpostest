import {methods as tagListService } from "../services/tagList.service";
import response from "./../entities/response";

const getTagLists = async (req, res) => 
{
    try
    {
        var tagLists = await tagListService.getAsyncTagLists();
        res.json(new response("OK Result", 200, tagLists));
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

const getTagList = async (req,res) => 
{
    try
    {
        const {id} = req.params;
        var tagList = await tagListService.getAsyncTagList(id);
        if(!tagList)
        { res.json(new response("Record not found",404,null)); }
        else
        {
            res.json(new response("OK Result",200, tagList));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

const postTagList = async (req,res) => 
{
    try
    {
        const { name } = req.body;

        if( name === undefined )
        { res.status(400).json({message: "Bad request. Please fill all fields."}); }
        else
        {
            var tagList = await tagListService.getAsyncTagListByName(name);
            if(tagList)
            { res.status(400).json(new response("Duplicate record",400,null)); }
            else
            {
                await tagListService.postAsyncTagList({
                    name
                });
                res.json(new response("OK Result",200,"Record added"));
            }
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

const updateTagList = async (req,res) => 
{
    try
    {
        const { id } = req.params;
        const { name } = req.body;
        console.log(id);
        if( id === undefined || name === undefined)
        { res.status(400).json({message: "Bad request. Please fill all fields."}); }
        else
        {
            var tagList = await tagListService.getAsyncTagListByName(name);
            if(tagList)
            { res.status(400).json(new response("Duplicate record",400,null)); }
            else
            {
                await tagListService.updateAsyncTagList(
                    {
                        id,
                        name,
                    }
                );
                res.json(new response("OK Result",200,"Updated record"));
            }
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}


const deleteTagList = async (req,res) => 
{
    try
    {
        const {id} = req.params;
        var tagList = await tagListService.getAsyncTagList(id)
        if(!tagList) {
            res.json(new response("ERROR", 404, "Record not found"));
        }   
        else {
            await tagListService.deleteAsyncTagList(id);
            res.json(new response("OK Result", 200, "Deleted record"));    
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

export const methods = 
{
    getTagLists,
    getTagList,
    postTagList,
    updateTagList,
    deleteTagList
}