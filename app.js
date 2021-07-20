const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')

//helper function to help me create unique Id for user
const createId = () =>{
    const mapLetter= {
        1:'A',2:'B',3:'C',4:'D',5:'E',6:'F',7:'G',8:'H',9:'I',10:'J',11:'K',12:'L',13:'M',14:'N',15:'O',16:'P',
        17:'Q',18:'R',19:'S',20:'T',21:'U',22:'V',23:'W',24:'X',25:'Y',26:'Z' 
    }
    let retStr = '';
    for(let i = 1; i < 12; i++){
        if(i % 3  === 0)
        retStr += mapLetter[Math.floor((Math.random() *  26) )+ 1];
        else if(i % 4 === 0)
        retStr += mapLetter[Math.floor((Math.random() *  26)) + 1].toLowerCase();
        else retStr += Math.floor((Math.random() * 9)) + 1;


    }
    return retStr;
    
}


const cors = require('cors')


//For handling auth routes
const authRoute = require('./routes/auth');

//For making update to profile
const userRoute = require('./routes/user');

const app = express();
const fileStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'images/')
    },
    filename: function(req,file,cb) {
        
        cb(null, `${createId()}` + '-'+ file.originalname);
    }
})

//helps me in filtering the kind of file i want
const fileFilter = function(req,file,cb) {
    
    if(file.mimetype === 'image/png' || 
    file.mimetype === 'image/jpg' ||
     file.mimetype === 'image/jpeg'){
         cb(null,true)
     }
     else cb(null,false)
}


app.use(express.json());
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));


app.use('/images',express.static(path.join(__dirname,'images')));



app.use(cors())

app.use('/profile',userRoute);
app.use('/auth',authRoute);

app.use((error,req,res,next) =>{
    const message = error.message;
    const status = error.statusCode || 500;
    console.log(error);
    res.status(status).json({
        message: message,
        error:error.errors
    });
})
mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser: true,useUnifiedTopology: true})
.then(result => {
   
 app.listen(process.env.PORT || 8080)
console.log('connected to mongodb!!!');

    })
.catch(err =>{
    throw err
    
})
