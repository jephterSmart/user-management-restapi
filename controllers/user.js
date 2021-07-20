const fs = require('fs')
const path = require('path')



const UserModel = require('../models/user');


//This is done for cases we need to view our profile
exports.getProfile = (req,res,next) => {
    UserModel.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find User');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message:'user posts',
        user: user
    })
    })
    .catch( err =>{
      if(!err.statusCode){
        err.statusCode = 500;

    }
    next(err);

    });
}
//This is the case, you want to upload profile Picture only, i.e., directly
exports.createProfilePicture = (req,res,next) =>{
  
  const image = req.file;
  
  
  if(!image){
      const error = new Error('Please a suitable picture of jpeg, png');
      error.statusCode = 422;
      throw error;
  }
  
  //find the user in our database and modify only the imageUrl field
  
  const imageUrl = image.path.replace('\\','/');
  UserModel.findById(req.userId)
  .then(user => {
    if (!user) {
      const error = new Error('Could not find User');
      error.statusCode = 404;
      throw error;
    }
    //if there is already an image for this user
    //delete the old picture
    if(user.imageUrl){
      clearImage(user.imageUrl);
    }

    user.imageUrl = imageUrl;
    return user.save();
  })
  
  .then(updatedUser => {
    
   
      res.status(201).json({
          message:'user profile Picture Added',
          imageUrl: updatedUser.imageUrl
      })
  
  })
  .catch(err => {
      if(!err.statusCode){
          err.statusCode = 500;

      }
      next(err);
  });
  
}

//This is use to update profile
exports.updateUser = (req, res, next) => {
    
   
    
    //this is done in case an image is added in the update profile process
    let imageUrl = req.body.image === 'default' && path.join(__dirname,'..','images',`default.jpg`);
    
    //This case is when a new file profile picture is selected.
    if (req.file) {
      imageUrl = req.file.path.replace('\\','/');
    }
    if (!imageUrl) {
      const error = new Error('No file picked.');
      error.statusCode = 422;
      throw error;
    }
    UserModel.findById(req.userId)
      .then(user => {
        if (!user) {
          const error = new Error('Could not find User');
          error.statusCode = 404;
          throw error;
        }
        
        //This is done in case, we add a new profile Image
        if (imageUrl !== user.imageUrl) {
          //remove the old Image
          clearImage(user.imageUrl || imageUrl);
        }
        //since it is a public api, we don't know what info is going to be saved,
    //therefore we save everthing, i.e req.body
    
        user.newData = {...req.body};
        user.imageUrl = imageUrl;
        return user.save();
      })
      .then(result => {
        res.status(201).json({ message: 'User updated!', user: result });
        
      })
     
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  };

// This is use for deleting a particular user
exports.deleteUser = (req,res,next) => {

   UserModel.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find User');
        error.statusCode = 404;
        throw error;
      }
      
      clearImage(user.imageUrl);
      
     UserModel.findByIdAndDelete(req.userId)
     .then(result => {
      res.status(200).json({
        message: 'profile deleted',
        user: result
    })
       
     })
     
     .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
}