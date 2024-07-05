import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
export const registerController = async (req, res) => {
    try {
      const { username, email, password} = req.body;
      //validations
      if (!username) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if(password.length<4)
      {
        return res.send({message:"password should be at least 4 characters!!!"})
      }
      if(password.length>8)
      {
        return res.send({message:"password should not be grater than 8 characters!!!"})
      }
      //check user
      const exisitingUser = await userModel.findOne({ email });
      //exisiting user
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "Already Register please login",
        });
      }
      //register user
      const hashedPassword = await hashPassword(password);
      //save
      const user = await new userModel({
        username,
        email,
        password: hashedPassword,
      }).save();
  
      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } //try closing
    catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Registeration",
        error,
      });
    }
  };
  
  