import { useState } from 'react'
import './Add.css'
import { ImagePlus } from 'lucide-react'
import api from '../../services/api'
import { toast } from 'react-toastify'

const Add = () => {

  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    name: "",
    description: "",
    priceCent: "",
    category: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    setIsLoading(true)

    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("priceCent", data.priceCent)
    formData.append("category", data.category)
    formData.append("image", image)

    try {
      const response = await api.post("/food/add", formData)

      setData({
        name: "",
        description: "",
        priceCent: "",
        category: ""
      })
      setImage(null)
      toast.success(response.data.message)

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      )
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <h1>Add New Food</h1>

        <div className="add-image flex-col">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Food preview"
              className="image-preview"
            />
          ) : (
            <label htmlFor="food-image" className="upload-image">
              <ImagePlus />
              <span>Upload Food Image</span>
              <small>PNG, JPG or WEBP</small>
            </label>
          )}
          <input onChange={(e) => setImage(e.target.files[0])} id="food-image" name="image" type="file" accept="image/*" required />
        </div>

        <div className="add-name flex-col">
          <label htmlFor="food-name">
            Food Name
          </label>
          <input onChange={onChangeHandler} value={data.name} id="food-name" name="name" type="text" placeholder="Enter food name" required />
        </div>

        <div className="add-description flex-col">
          <label htmlFor="food-description">
            Description
          </label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
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
            <select onChange={onChangeHandler}
              value={data.category}
              id="food-category" name="category" required>
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
              onChange={onChangeHandler}
              value={data.priceCent}
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
        <button type="submit" className="add-button" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  )
}
export default Add