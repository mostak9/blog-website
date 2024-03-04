import express, { json } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

// schemas
import User from './Schema/User.js';

const server = express();
let PORT = 5000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


// middlewarea
server.use(express.json())

// Database connection string
const dbString = `mongodb+srv://blogAdmin:NRx9petHawVm1VKg@bloging-project.njuirjw.mongodb.net/?retryWrites=true&w=majority&appName=bloging-project`

// Database connection
mongoose.connect(dbString, {
    autoIndex: true
})

// generate user name
const generateUsername = async (email) => {
    let username = email.split("@")[0]
    let isUsernameNotUnique = await User.exists({ "personal_info.username": username }).then(result => result)

    isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";
    return username
}

// formate data to send
const formateDataToSend = user => {
    // console.log(process.env.SECRET_ACCESS_KEY)
    const access_token = jwt.sign({id: user.personal_info.email}, process.env.SECRET_ACCESS_KEY)
    return (
        {
            access_token,
            profile_img: user.personal_info.profile_img,
            username: user.personal_info.username,
            fullname: user.personal_info.fullname,
        }
    )
}

server.post('/signup', (req, res) => {
    const { fullname, email, password } = req.body;
    // validating the data from frontend
    if (fullname.length < 3) {
        return res.status(403).json({ "error": "Fullname must be at least 3 letter long" })
    }
    if (!email.length) {
        return res.status(403).json({ "error": "Enter Email" })
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Email is invalid" })
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters" })
    }

    bcrypt.hash(password, 10, async (err, hashed_pass) => {
        let username = await generateUsername(email);
        let user = new User({
            personal_info: { fullname, email, password: hashed_pass, username }
        })

        user.save().then((u) => {
            return res.status(200).json(formateDataToSend(u))
        })
            .catch(err => {
                if (err.code == 11000) {
                    return res.status(500).json({ "error": "Email already exists" })
                }
                return res.status(500).json({ "error": err.message })
            })
        console.log(hashed_pass)
    })
    // return res.status(200).json({ "status": "okey" })
})

server.post('/signin', (req, res) => {
    let {email, password} = req.body;

    User.findOne({ "personal_info.email": email })
    .then(user => {
        console.log(user)
        if(!user) {
            return res.status(403).json({"error": "Email not found"})
        }
        bcrypt.compare(password, user.personal_info.password, (err, result) => {
            if(err) {
                return res.status(403).json({"error": "Error occured while login please try again"})
            }
            if(!result) {
                return res.status(403).json({"error": "Incorrect password"})
            } else {
                return res.status(200).json(formateDataToSend(user))
            }
        })
    })
    .catch(err => {
        console.log(err.message)
        return res.status(500).json({"error": err.message})
    })
})


// server listenting port
server.listen(PORT, () => {
    console.log(`listening on port => ${PORT}`)
})