import express from 'express';
import router from './router';
import morgan from 'morgan';
import { authCheck } from './modules/auth';
import { createNewUser, authenticateUser } from './handlers/user'


process.on('uncaughtException', (e)=>console.log(e))
process.on('unhandledRejection', (e)=> console.log(`This is the error from async ${e}`))

setTimeout(()=>{
    throw new Error('Oops')
},100)
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

app.use('/api', authCheck, router)  // add auth check middleware for jwt tocken for all api routes 
app.post('/user', createNewUser)
app.post('/login', authenticateUser)

app.use((err, req, res, next) => {
if (err.type === 'auth') {
    res.status(401).json({message: 'Unauthorized'})
} else if (err.type === 'input') {
    res.status(400).json({message: 'Invalid input'})
} else {
    res.status(500).json({message:'Oooops that is an server error'})
}
})

export default app;