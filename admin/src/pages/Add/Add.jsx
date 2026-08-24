import { useState } from 'react'
import './Add.css'
import { ImagePlus } from 'lucide-react'

const Add = () => {

  const [image, setImage] = useState(null)
  return (
    <div className='add'>
      <form className='flex-col'>
        <h1>Add New Food</h1>

        <div className="add-image flex-col">
          <label htmlFor="food-image" className="upload-image">
            <ImagePlus />
            <span>Upload Food Image</span>
            <small>PNG, JPG or WEBP</small>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} id="food-image" name="image" type="file" accept="image/*" required />
        </div>

        <div className="add-name flex-col">
          <label htmlFor="food-name">
            Food Name
          </label>
          <input id="food-name" name="name" type="text" placeholder="Enter food name" required />
        </div>

        <div className="add-description flex-col">
          <label htmlFor="food-description">
            Description
          </label>
          <textarea
            id="food-description"
            name="description"
            placeholder="Enter food description"
            rows="6"
            required
          />
        </div>

        <div className="add-category-price">
          <div className='add-category flex-col'>
            <label htmlFor="food-category">
              Category
            </label>
            <select id="food-category" name="category" required>
              <option value="">Select category</option>
              <option value="Appetizers">Appetizers</option>
              <option value="BBQ & Grills">BBQ & Grills</option>
              <option value="Rice Bowls">Rice Bowls</option>
              <option value="Noodles">Noodles</option>
              <option value="Soups & Stews">Soups & Stews</option>
              <option value="Side Dishes">Side Dishes</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <label htmlFor="food-price">
              Price (cents)
            </label>
            <input
              id="food-price"
              name="priceCent"
              type="number"
              placeholder="100"
              min="0"
              step="1"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          Add Food
        </button>
      </form>
    </div>
  )
}
export default Add