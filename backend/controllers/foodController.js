import FoodModel from "../models/FoodModel.js";
import fs from 'fs';

//add food item
const addFood = async (req, res) => {

  try {
    const { name, description, priceCent, category } = req.body

    // Validate required fields
    if (!name || !description || !priceCent || !category) {
      return res.status(400).json({
        message: "All food fields are required."
      })
    }

    // Validate image
    if (!req.file) {
      return res.status(400).json({
        message: "Food image is required."
      })
    }

    const price = Number(priceCent)

    // Validate price
    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        message: "Price must be a valid positive number."
      })
    }

    const food = new FoodModel({
      name,
      image: req.file.filename,
      priceCent: price,
      description,
      category
    })

    await food.save();
    res.status(201).json({ message: "Food added successfully." })
  } catch (error) {
    console.error(error);
    res.status(500).json({
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