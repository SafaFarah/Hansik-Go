import './List.css'
import api from '../../services/api'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Trash2 } from "lucide-react"

const List = ({url}) => {

  const [list, setList] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchList = async () => {
    try {
      const response = await api.get("/food/list")
      setList(response.data.data)
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch food items."
      )
    }
  }

  const removeFood = async () => {
    if (!selectedFood) return
    try {
      setIsDeleting(true)
      const response = await api.delete(`/food/${selectedFood._id}`)

      if (response.data.success) {
        setList((prevList) =>
          prevList.filter((item) => item._id !== selectedFood._id)
        )
        toast.success(response.data.message)
        setSelectedFood(null)
      }
    } catch (error) {
      console.error("Error removing food:", error)

      toast.error(
        error.response?.data?.message || "Failed to remove food."
      )
    } finally {
      setIsDeleting(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p className="list-title">All Food Items</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${(item.priceCent / 100).toFixed(2)}</p>
            <button onClick={() => setSelectedFood(item)}
              className="delete-btn">
              <Trash2 />
            </button>
          </div>
        ))}
      </div>

      {selectedFood && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Delete food item?</h3>
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setSelectedFood(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-btn"
                onClick={removeFood}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default List