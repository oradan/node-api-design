import * as dotenv from 'dotenv';
dotenv.config(); //loads all data from the env file into process.env
import  app from './server';



app.listen(3001, ()=>{
    console.log("server listen on port 3001")
})
