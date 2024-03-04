import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const server = express();
let PORT = 5000;

const dbString = `mongodb+srv://blogAdmin:NRx9petHawVm1VKg@bloging-project.njuirjw.mongodb.net/?retryWrites=true&w=majority&appName=bloging-project`

mongoose.connect(dbString, {
    autoIndex: true
})

server.post('/signup', (req, res) => {
    res.json(req.body)
})

server.listen(PORT, () => {
    console.log(`listening on port => ${PORT}`)
})