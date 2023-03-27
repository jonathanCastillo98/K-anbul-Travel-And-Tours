import './navbar.css'

import { useState } from 'react'

import kanbul from '../../assets/kanbul.png'
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

const Navbar = () => {

    const [activeNavBar, setActiveNavBar] = useState("navBar");

    const showNavBar = () => {
        setActiveNavBar("navBar activeNavBar")
    }

    const removeNavBar = () => {
        setActiveNavBar("navBar")
    }

    return (
        <section className="navBarSection">
            <header className="header flex">

                <div className="logoDiv">
                    <a href="#" className="logo flex">
                        <h1> <img src={kanbul} alt={kanbul} className="icon" /> K'anbul Travel and Tours</h1>
                    </a>
                </div>

                <div className={activeNavBar}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <a href="#" className="navLink">Home</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Packages</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Shope</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Car Rental</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Tours</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">About</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Contact</a>
                        </li>

                        <button className="btn">
                            <a href="#">BOOK NOW</a>
                        </button>
                    </ul>

                    <div className="closeNavBar" onClick={removeNavBar}>
                        <AiFillCloseCircle className='icon' />
                    </div>
                </div>

                <div className="toggleNavBar" onClick={showNavBar}>
                    <TbGridDots className="icon" />
                </div>
            </header>
        </section>
    )
}

export default Navbar