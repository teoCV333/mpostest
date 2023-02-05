import {methods as categoryService } from "../services/category.service";
import response from "./../entities/response";

const getCategories = async (req,res) => 
{
    try
    {
        console.log('entra');
        var categories = await categoryService.getAsyncCategories();
        res.json(new response("OK Result", 200, categories));
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

const getCategory = async (req,res) => 
{
    try
    {
        const {id} = req.params;
        var category = await categoryService.getAsyncCategory(id);
        if(!category)
        { res.json(new response("Record not found",404,null)); }
        else
        {
            res.json(new response("OK Result",200, category));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

const getCategoryByName = async (req,res) => 
{
    try
    {
        const {name} = req.params;
        var category = await categoryService.getAsyncCategoryByName(name);
        if(!category)
        { res.json(new response("Record not found",404,null)); }
        else
        {
            res.json(new response("OK Result",200, category));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500, null));
    }
}

const postCategory = async (req,res) => 
{
    try
    {
        const { name } = req.body;

        if( name === undefined )
        { res.status(400).json({message: "Bad request. Please fill all fields."}); }
        else
        {
            var category = await categoryService.getAsyncCategoryByName(name);
            if(category)
            { res.status(400).json(new response("Duplicate record",400,null)); }
            else
            {
                await categoryService.postAsyncCategory({
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

const updateCategory = async (req,res) => 
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
            var category = await categoryService.getAsyncCategoryByName(name);
            if(category)
            { res.status(400).json(new response("Duplicate record",400,null)); }
            else
            {
                await categoryService.updateAsyncCategory(
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


const deleteCategory = async (req,res) => 
{
    try
    {
        const {id} = req.params;
        console.log(req.params);
        var category = await categoryService.getAsyncCategory(id)
        if(!category) {
            res.json(new response("ERROR", 404, "Record not found"));
        }   
        else {
            await categoryService.deleteAsyncCategory(id);
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
    getCategories,
    getCategory,
    getCategoryByName,
    postCategory,
    updateCategory,
    deleteCategory
}