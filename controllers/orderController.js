import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
//order controller
export const orderController = async (req,res) => {
    try{
        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
            shippingAddress:req.body.shippingAddress,
            user:req.user._id,
          });
      
      const order = await newOrder.save();
      res.status(201).send({
        success: true,
        message: "order created Successfully",
        order,
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in order generation",
        error,
      });
    }
  }
    