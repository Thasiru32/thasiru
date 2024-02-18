const express = require('express')
const app =express()
const bodyPasser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./Model/UserSchema')
const Product = require('./Model/productSchema')
app.use(express.json())


app.use(bodyPasser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('views')
app.set('view engine', 'ejs')

app.get('/', (req,res)=>{
    res.render('index.ejs')
})

const dbURL = "mongodb+srv://thasiruChandul:vRG7ThyOFfQu2ir1@cluster0.tfdbsph.mongodb.net/myProjectT?retryWrites=true&w=majority"

mongoose.connect(dbURL).then((result)=>{console.log('databassConnected')}).catch((err)=>{console.log(err)})

app.post('/ren', async(req,res)=>{
    const firstName = req.body.uName
    //res.send('data reciewed')
    const UName = await User.create(req.body)
    res.render('register.ejs')
})

app.get('/register', (req,res)=>{
    res.render('register.ejs')
})

app.post('/re',async(req,res)=>{

    const {RName, RPass} = req.body
    

    try{
        const logUser = await User.findOne({uMail: RName, uPass: RPass})

        const dbData = {
            userName:logUser.uName
        }




        res.render('registered.ejs',{dbData})
        console.log(RName+" My input")
        console.log(logUser)
        console.log(dbData.userName)

        module.exports(dbData)

    }catch(err){
        console.log(err)
        res.render('logingFailed.ejs')

    }
})

app.get('/graphic', (req,res)=>{
    res.render('graphic.ejs')
})

app.post('/graphic', async(req,res)=>{
    const Prod = await Product.create(req.body)
})


app.listen(3000, () =>{
    console.log('this app is currectly run on port number 3000')
})