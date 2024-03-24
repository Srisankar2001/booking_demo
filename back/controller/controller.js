const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Ticket = require('../model/ticket')
const app = express()
app.use(express.json())
app.use(cors())
// Connection URI
const uri = 'mongodb://127.0.0.1:27017/Sample_booking';


// Connect to MongoDB using Mongoose
mongoose.connect(uri)
.then((result)=>{
    console.log('DB connected')
})
.catch((error)=>{
    console.log('DB not connected',error)
})
app.post("/add", async(req,res)=>{
   try{
    const seats = req.body.seat; 
    const owner = req.body.owner

    for(const seat of seats){
        const ticket = new Ticket({
            seatNumber: seat,
            seatOwner: owner
        }
        )
        await ticket.save()
    }
    console.log("Success")
    return res.status(200).send("Success")
   }
   catch(error){
    console.log("Error Add")
    return res.status(500).send("Error")
   }
})
app.post("/delete",async(req,res)=>{
    try{
        const seats = req.body.seat;
        for(const seat of seats){
            await Ticket.deleteOne({seatNumber:seat})
        }
        console.log("Success")
        return res.status(200).send("Success")
    }
    catch(error){
        console.log("Error Delete")
        return res.status(500).send("Error")
    }
})
app.get("/reset",async(req,res)=>{
    await Ticket.deleteMany({})
    return res.status(200).send("Success")
})
app.get("/",async(req,res)=>{
    const result = await Ticket.find({})
    const resultNumber = result.map(ele=>ele.seatNumber)
    console.log(resultNumber)
    return res.status(200).send(resultNumber)
})
app.listen(3001,()=>{
    console.log('App Started')
})