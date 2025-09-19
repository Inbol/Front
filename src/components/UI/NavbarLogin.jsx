/**
 * @file NavbarLogin.jsx
 * @author Yael Pérez
 * @description NavbarLogin que se renderiza en el public layout
 */

import React from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CustomButton from './CustomButton';

function NavbarLogin() {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }

    return (
        <div className="w-full fixed">
            <header className="bg-primary-500 flex w-full justify-center">
            <nav className="bg-primary-500 flex justify-between items-center w-[95%] font-family p-4">
                <div className="cursor-pointer" onClick={handleClick}>
                    <h1 className='text-5xl font-bold text-white'>Inbol</h1>
                </div>
                <div className="">
                    <ul className="flex items-center gap-[4vw] [&>li:hover]:scale-105">
                        <li>
                            <Link to="/" className="text-white">Home</Link>
                        </li>
                        <li>
                            <Link to="/houses" className="text-white">Casas</Link>
                        </li>
                        <li>
                            <Link to="/services" className="text-white">Servicios</Link>
                        </li>
                        <li>
                            <Link to="/disclaimer" className="text-white">Valuar</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            </header>
        </div>
    );
}

export default NavbarLogin;
