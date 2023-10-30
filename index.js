import express from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
// import Routers
import authRoute from './routers/routes.js'

const app = express()
// middleware
app.use(express.json())
app.use(cors())
dotenv.config()

const PORT = process.env.PORT

// connect mongodb
const connect = () => {
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("Connected Successfully ✅")
    }catch(error){
        console.log("Disconnected!")
    }
}

// Routers
app.use("/api" , authRoute)

// Port
app.listen(PORT,()=>{
    connect()
    console.log(`App Run On Port ${PORT}`)
})