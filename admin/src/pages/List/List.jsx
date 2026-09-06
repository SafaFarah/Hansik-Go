import './List.css'
import api from '../../services/api'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Trash2 } from "lucide-react"

const List = () => {

  const [list, setList] = useState([]);
  const url = "http://localhost:4000"

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
              <button className="delete-btn">
                <Trash2  />
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}
export default List