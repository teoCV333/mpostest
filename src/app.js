import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";

//Routes
 import productRoutes from "./routes/product.routes";
 import userRoutes from "./routes/user.routes";
 import categoryRoutes from "./routes/category.routes";
 import tagListRoutes from "./routes/tagList.routes";
/*import categoryProductRoutes from "./routes/productCategory.routes"; */

const cors = require('cors')
const app = express();


 
// Settingss
app.set("port",3000);
//
//
app.use(cors()) //Todo el mundo()

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/tag-list", tagListRoutes);
export default app;
