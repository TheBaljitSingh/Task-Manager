const jwt = require("jsonwebtoken");


//Creating Token and saving in cookie
    const sendToken = (user, statusCode, res)=>{
    // ye token generate kiya, jwt method use karke
    console.log("sendToken method is called");
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })

    //options for cookie
    const option = {
        expires:new Date(
        Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
    };
    res.status(statusCode).cookie("token",token,option).json({
        success:true,
        user,
        token,
    });

}; 

module.exports = sendToken;