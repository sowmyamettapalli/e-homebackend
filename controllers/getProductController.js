import productModel from "../models/productModel.js";
//To get specific product By Id 
export const getProductController = async (req, res) =>
{
 try{
  //const {id} = req.params._id
   const product = await productModel.findById(req.params.id);
   res.status(200).send(product);
   //res.json(product)
 }
 catch (error) {
   console.log(error);
   res.send({error});
 }
};