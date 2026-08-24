import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { PlusCircle, List, ShoppingBag } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to='/add' className="sidebar-option">
          <PlusCircle />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='./list' className="sidebar-option">
          <List />
          <p>List Items</p>
        </NavLink>
        <NavLink to='./orders' className="sidebar-option">
          <ShoppingBag />
          <p>Orders</p>
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar