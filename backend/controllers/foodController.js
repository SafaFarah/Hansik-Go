import FoodModel from "../models/FoodModel.js";
import fs from 'fs';

//add food item
const addFood = async (req, res) => {

  const imageFilename = req.file.filename;

  const food = new FoodModel({
    name: req.body.name,
    image: imageFilename,
    priceCent: req.body.priceCent,
    description: req.body.description,
    category: req.body.category
  })

  try {
    await food.save();
    res.json({ success: true, message: "Food added" })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add food.",
    });
  }
}

//foods list
const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.json({ success: true, data: foods })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve food items.",
    });
  }
}

// remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findById(id)
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found.",
      });
    }

    //remove image
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
    
    // delete food
    await food.deleteOne();
    res.json({ success: true, message: "Food removed" })
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to remove food.",
    });
  }
}

export { addFood, listFood, removeFood }