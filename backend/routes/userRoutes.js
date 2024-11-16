const express = require("express");
const router = express.Router();
const User = require("../modals/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//register

const secretkey = "7dc3d563a28f89c9ef3a909612cd450815520de782ac66577c6fd1404571e9af"

router.post("/register", async (req, res) => {
    try{
    const{ name, email, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({status:false,message:"Please enter all the fields"});

     const existingUser = await User.findOne({email});
     if(existingUser) return res.status(400).json({status:false,message:"User already exists"});
     
     const hashPassword = await bcrypt.hash(password,10)

     const newUser = new User({ name, email , password:hashPassword});
     await newUser.save();

        console.log("API HIT" , req.body);
        return  res.status(201).json({status:true,message:"Registerd successfully"});

    }catch(error){
        return res.status(400).json({status:false,message:"Something went wrong",error:error.message});

    };
    

});

//login
router.post("/login", async (req, res) => {
    try{
    const{ email, password } = req.body;
    if( !email || !password) return res.status(400).json({status:false,message:"Please enter all the fields"});

     const user = await User.findOne({email});
     if(!user || !(await bcrypt.compare(password,user.password)) ){
        return res.status(400).json({status:false,message:"Invalid credentials"});
     }
     const token = jwt.sign({id:user._id , email:user.email},secretkey,{expiresIn:"1hr"});
        return  res.status(201).json({status:true,message:"Login successfully",token:token});


    }catch(error){
        return res.status(400).json({status:false,message:"Something went wrong",error:error.message});

    };
    

});


//profile
router.post("/profile", async (req, res) => {
    try{
      const token = req.headers?.authorization?.split(' ')[1];
      if(!token) return res.status(400).json({status:false,message:"UnAuthorized"});

jwt.verify(token,secretkey,async(err, decode)=>{
    const user = await User.findById(decode?.id);
    if(!user) return res.status(400).json({status:false,message:"Invalid token"});
    const userData = {
        id:user._id,
        name:user.name,
        email:user.email
    }
    return  res.status(201).json({status:true,message:"Profile Data",data:userData});
})
    


    }catch(error){
        return res.status(400).json({status:false,message:"Something went wrong",error:error.message});

    };
    

});



module.exports = router