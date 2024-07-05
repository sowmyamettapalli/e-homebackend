import productModel from "../models/productModel.js";
import data from "../data.js";
//seed controller
export const seedController = async (req,res) => {
    try{
      await productModel.deleteMany({});
      const products = await productModel.insertMany(data.products);
      res.status(200).send({ products
      });
    }
    catch (error) {
      console.log(error);
      res.send({error});
    }
  }
  