import productModel from "../models/productModel.js";
//Product controller
export const productController = async (req,res) => {
    try{
      const products = await productModel.find();
      res.status(200).send({products});
    }
    catch (error) {
      console.log(error);
      res.send({error});
    }
  }