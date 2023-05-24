import '../../../styles/css/navbar.css'

import { useState } from 'react'

import kanbul from '../../assets/kanbul.png'
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [activeNavBar, setActiveNavBar] = useState("navBar");

    const showNavBar = () => {
        setActiveNavBar("navBar activeNavBar")
    }

    const removeNavBar = () => {
        setActiveNavBar("navBar")
    }

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toLogin = location.pathname && `/login`

    const handleOnLoginClick = () => {
        navigate(toLogin, { replace: true });
    }
    const handleOnNavbarLinkClick = (e) => {
        console.log(e.target.value)
    }

    const userState = useSelector((store: AppStore) => store.user);

    return (
        <section className="navBarSection">
            <header className="header flex">

                <div className="logoDiv">
                    <a className="logo flex">
                        <h1> <img src={kanbul} alt={kanbul} className="icon" /> K'anbul Travel and Tours</h1>
                    </a>
                </div>

                <div className={activeNavBar}>
                    <ul className="navLists flex">
                        <li className="navItem" value={"home"} onClick={handleOnNavbarLinkClick}>
                            <span
                                className="navLink"
                            >Home</span>
                        </li>

                        <li className="navItem" value={"packages"}>
                            <a className="navLink"
                                onClick={handleOnNavbarLinkClick}>Packages</a>
                        </li>

                        <li className="navItem" value={"tours"}>
                            <a className="navLink"
                                onClick={handleOnNavbarLinkClick}>Tours</a>
                        </li>

                        <li className="navItem" value={"carRental"}>
                            <a className="navLink"
                                onClick={handleOnNavbarLinkClick}>Car Rental</a>
                        </li>

                        <li className="navItem" value={"about"}>
                            <a className="navLink"
                                onClick={handleOnNavbarLinkClick}>About</a>
                        </li>

                        <li className="navItem" value={"contact"}>
                            <a className="navLink"
                                onClick={handleOnNavbarLinkClick}>Contact</a>
                        </li>

                    </ul>

                    {userState.token ?
                        (<div>{userState.username}</div>) :
                        (<div className="registerBttns">
                            <button className="btn">
                                <a>Register</a>
                            </button>
                            <button onClick={handleOnLoginClick} className="btn">
                                <a>Login</a>
                            </button>
                        </div>)
                    }

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