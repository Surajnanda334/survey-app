const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config')

//middlewares
const errorHandler = require('./middlewares/errorHandler.js');

//routes
const userRoute = require('./routes/userRoute');

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connectDB = async (MONGO_URI) => { 
    try{
        // mongodb connection string 
        const con = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

connectDB(process.env.MONGO_URI)

app.use('/api/user', userRoute);

//error handler
app.use((err, req, res, next) => {
    console.log("ErrorHandler: Error ",err.stack)
});


app.get("/", errorHandler((req, res, next) => {
   res.status(200).json({
        status: true,
        message: "Welcome"
    })
}))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})