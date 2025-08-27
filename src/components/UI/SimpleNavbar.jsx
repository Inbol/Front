/**
 * @file SimpleNavbar.jsx
 * @author Yael Pérez
 * @description Navbar que se renderiza en el simple layout
 */

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SimpleNavbar = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }

  return (
    <div>
      <div className="w-full fixed">
        <header className="bg-primary-500 flex w-full justify-center">
            <nav className="bg-primary-500 flex justify-between items-center w-[95%] font-family p-4">
                <div className="cursor-pointer" onClick={handleClick}>
                    <h1 className='text-5xl font-bold text-white'>Inbol</h1>
                </div>
            </nav>
        </header>
        </div>
    </div>
  )
}

export default SimpleNavbar