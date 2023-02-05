import response from "./../entities/response";
import { methods as userServices } from "./../services/user.service";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";

//REGISTER
const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const { completeName, password, username, roleId } = req.body;
        if( completeName == undefined || password == undefined || username == undefined ) {
            res.status(400).json(new response ("Bad request. Please fill all fields.", 400, null));
        }
        else {
            const user = await userServices.getAsyncAccountByUsername(username)
            if(!user) {
                const hashedPassword = await bcrypt.hash(password, 10);
                  await userServices.postAsyncUser(
                    {
                        username,
                        password: hashedPassword,
                        completeName,
                        roleId
                    }
                ); 
                res.json(new response("User created", 200, 'record added'));
            }
            else {
                res.json(new response("This user already exist", 400, null));  
            }
        }
    } catch (error) {
        console.log(error);
        res.json(new response(error.message, 500, null));
    }
}

//LOGIN
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        //validacion de campos
        if( username == undefined || password == undefined) {
            res.status(400).json(new response ("Bad request. Please fill all fields.", 400, null));
        }
        else {
            const user = await userServices.getAsyncAccountByUsername(username);
            //validar sí existe la cuenta en la base de datos
            if(!user) {
                res.json(new response("User not found", 404, null));  
            }
            else {
                //Validacion de password
                const passwordValid = await bcrypt.compare(password, user.password);
                console.log(passwordValid);
                if(!passwordValid) {
                    res.json(new response("Incorrect password", 401, null));
                }
                else {
                    const role = user.role;
                    console.log(user);
                    //Generar token
                    const token = jwt.sign(
                        {
                            username: user.username,
                        },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: 10800000 //3 hours
                        }
                    );
                    res.json(new response("Account loged", 200, {token, role}));
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.json(new response(error.message,500, null));
    }
}

const getUser = async (req, res) => {
    const username = req.params.username
    console.log(username);
    if(username == undefined) {
        res.status(400).json(new response ("Bad request. Please fill all fields.", 400, null));
    }
    else {
        const user = await userServices.getAsyncAccountByUsername(username);
        if(!user) {
            res.json(new response("Account not found", 404, null));  
        }
        else {
            res.json(new response("OK", 200, user));
        }
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    if(id == undefined) {
        res.status(400).json(new response ("Bad request. Please fill all fields.", 400, null));
    }
    else {
        const user = await userServices.getAsyncUser(id);
        if(!user) {
            res.json(new response("Account not found", 404, null));  
        }
        else {
            res.json(new response("OK", 200, user));
        }
    }
}


const getUsers = async (req,res) => 
{
    try
    {
        var users = await userServices.getAsyncUsers();
        res.json(new response("OK Result",200,users));
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}

const updateUser = async(req, res) => {
    try
    {
        const { id } = req.params;
        const { completeName, username, roleId } = req.body;
        if( completeName === undefined || username === undefined || roleId === undefined)
        {
            res.status(400).json(new response("Bad request. Please fill all fields.",400,null));
        }else
        {
            var user = await userServices.getAsyncUser(id);
            if(!user)
            {
                res.status(404).json(new response("Record not found", 400 , null));
            }else
            {
                var u = await userServices.getAsyncUser(id);
                if(u)
                {
                    await userServices.updateAsyncUser(
                        {
                            id,
                            username,
                            completeName,
                            roleId
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

const deleteUser = async (req,res) => 
{
    try{
        const user = await userServices.getAsyncUser(req.params.id)
        console.log(user);
        if(user === null){            
            res.json(new response("Error", 404, "Record not found"));   
        }
        else {
            await userServices.deleteAsyncUser(req.params.id);
            res.json(new response("OK Result", 200, "Record deleted"));
        }
    }catch(error)
    {
        res.status(500);
        res.json(new response(error.message,500,null));
    }
}



export const methods = {
    createUser,
    loginUser,
    getUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
}