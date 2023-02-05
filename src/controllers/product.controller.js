import response from "./../entities/response";
import { methods as productService } from "./../services/product.service";

const getProducts = async (req,res) => 
{
    try
    {
        var products = await productService.getAsyncProducts();
        res.json(new response("OK Result",200,products));
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const getProduct = async (req,res) => 
{
    try
    {
        const {id} = req.params;
        var product = await productService.getAsyncProduct(id);
        if(!product) {
            res.json(new response("ERROR", 404, "Product not found."));
        }
        else {
            res.json(new response("OK Result", 200, product));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message, 500, null));
    }
}

const postProduct = async (req,res) => 
{
    try
    {
        const { cost, name, categoryId } = req.body;

        console.log(req.body);
        console.log(req.body);
        if( cost === undefined || name === undefined || categoryId === undefined )
        { res.status(400).json(new response("Bad request. Please fill all fields.",400,null)); }
        else
        {
            var product = await productService.getAsyncProductByName(name);
            if(product)
            { res.status(400).json(new response("Duplicate record", 400, null)); }
            else
            {
                await productService.postAsyncProduct(
                    {
                        cost,
                        name,
                        state: 0,
                        categoryId
                    }
                );
                res.json(new response("OK Result",200,"Record added"));
            }
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message, 500, null));
    }
}



const getProductByName = async(req, res) => {
    try
    {
        const {name} = req.params;
        var product = await productService.getAsyncProductByName(name);
        if(!product) {
            res.json(new response("ERROR", 404, "Product not found."));
        }
        else {
            res.json(new response("OK Result", 200, product));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message, 500, null));
    }
}

const updateProduct = async(req, res) => {
    try
    {
        const { id } = req.params;
        const { cost, name , categoryId,} = req.body;
        if( cost === undefined || name === undefined || categoryId === undefined)
        {
            res.status(400).json(new response("Bad request. Please fill all fields.",400,null));
        }else
        {
            var product = await productService.getAsyncProduct(id);
            if(!product)
            {
                res.status(404).json(new response("Record not found", 400 , null));
            }else
            {
                var p = await productService.getAsyncProduct(id);
                if(p)
                {
                    await productService.updateAsyncProduct(
                        {
                            id,
                            name,
                            cost,
                            categoryId,
                        }
                    )
                    res.json(new response("OK Result", 200, "Record updated"));
                }else
                {
                    res.status(400).json(new response("Duplicate record", 400, null));
                }
            }
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const deleteProduct = async (req,res) => 
{
    try{
        const product = await productService.getAsyncProduct(req.params.id)
        console.log(product);
        if(product === null){            
            res.json(new response("Error", 404, "Record not found"));   
        }
        else {
            await productService.deleteAsyncProduct(req.params.id);
            res.json(new response("OK Result", 200, "Record deleted"));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}





export const methods = {
    postProduct,
    getProducts,
    getProduct,
    getProductByName,
    updateProduct,
    deleteProduct
}