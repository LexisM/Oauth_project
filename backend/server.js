import express from "express";
import { routes } from "./routes/index.js";
import cors from "cors";


const app = express();

const PORT = process.env.PORT || 5000;

//This allows us to access the body of POST/PUT requests
//in out route handlers (as req.body)
app.use(cors());
app.use(express.json());

//Add all the routes to our Express server
//exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
