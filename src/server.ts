import express from 'express';
import router from './router';
import morgan from 'morgan'



const app = express();
// this is a custommiddleware that can reveive arguments
const customMiddleware = (message) => (req, res, next) => {
    console.log(message);
    next();
}

app.use(morgan('dev'))  // logs the request at the toplavelof the application
app.use(express.json())  // allows the client to send json object in the body
app.use(express.urlencoded({ extended: true })) // allows client to send queries in the url
app.use(customMiddleware("heii this is a start of a beautiful journey"))

app.get('/', (req, res) => {
    res.status(200);
    res.json({ 'message': 'Hello world' })
})

app.use('/api', router)



export default app;