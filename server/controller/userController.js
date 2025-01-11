import User from "../models/userModel.js"
import sendToken from "../utils/jwtToken.js"


export const registerUser = async(req, res, next) =>{

   try {
     const {name, email, password} = req.body;
 
     //check user is alreay ergistered
 
     const alreadyExist = await User.findOne({ email });
 
     if(alreadyExist){
        return res.status(400).json({message: "user already exist"});
     }
 
     const user = await User.create({
         name, email, password
     })
 
     sendToken(user, 201, res);
    } catch (error) {

        

        res.status(500).json({error: "Internal server error"});
    
   }
}

export const loginUser = async(req,res,next)=>{
    const {email, password} = req.body;

    console.log(email+password);

    if(!email || !password){
        //agar dono nahi mila to
        return next("Please Enter Email & Password");
    }

    const user = await User.findOne({email}).select("+password");
  
    if(!user){
        return next("Invalid email or password");
    } 

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next("Invalid email or password");
    }

    sendToken(user,200,res);
};

//Logout User

export const logoutUser = async(req, res, next)=>{
    
    // console.log(res);
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });  
}