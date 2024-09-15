const jwt = require("jsonwebtoken") // 3rd
const User = require("../models/userModel")  //5th

const requireAuth = async (req,res,next) => {

    // verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: "Authorizaton token required"})
    }

    const token = authorization.split(' ')[1]   //2nd

    try {
        const {_id} =  jwt.verify(token, process.env.SECRET)  //4th

        req.user = await User.findOne({ _id }).select("_id")    //5th
        next()     

    } catch (error) {
        console.log(error);           
        res.status(401).json({error: "Request is  not authorized"})
    }      //4th
}

module.exports = requireAuth