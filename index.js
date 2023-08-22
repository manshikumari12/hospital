const express = require("express")
const app=express()
const {connection} = require("./db")
const {AppointmentRouter} =require("./route/appointment.route")
const {UserRoute} = require("./route/user.route")
const cors = require("cors")


app.use(express.json())

app.use(cors())
app.use("/user",UserRoute)
app.use("/api",AppointmentRouter)

app.listen(1111, async()=>{
    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log(error);
    }
    console.log("server is running 1111");
})