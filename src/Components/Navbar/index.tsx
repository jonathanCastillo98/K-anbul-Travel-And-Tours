import '../../../styles/css/navbar.css';

import { BaseSyntheticEvent, SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserInfo } from '../../models';

// Assets
import kanbul from '../../assets/kanbul.png';

// Icons
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

const Navbar = () => {

    // State variables
    const [activeNavBar, setActiveNavBar] = useState<string>("navBar");

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toLogin = location.pathname && `/login`;

    // Handlers
    const showNavBar: VoidFunction = () => {
        setActiveNavBar("navBar activeNavBar")
    }

    const removeNavBar: VoidFunction = () => {
        setActiveNavBar("navBar")
    }

    const handleOnLoginClick: VoidFunction = () => {
        navigate(toLogin, { replace: true });
    }
    const handleOnNavbarLinkClick = (e: BaseSyntheticEvent) => {
        navigate(`/${e.target.textContent}`, { replace: true });
    }

    const userState: UserInfo = useSelector((store: AppStore) => store.user);

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
                            Inicio
                        </li>

                        <li className="navItem" value={"packages"} onClick={handleOnNavbarLinkClick}>
                            Paquetes
                        </li>

                        <li className="navItem" value={"tours"} onClick={handleOnNavbarLinkClick}>
                            Tours
                        </li>

                        <li className="navItem" value={"carRental"} onClick={handleOnNavbarLinkClick}>
                            Renta de carros
                        </li>

                        <li className="navItem" value={"about"} onClick={handleOnNavbarLinkClick}>
                            Nosotros
                        </li>

                        <li className="navItem" value={"contact"} onClick={handleOnNavbarLinkClick}>
                            Contacto
                        </li>

                    </ul>

                    {userState.token ?
                        (<div>{userState.username}</div>) :
                        (<div className="registerBttns">
                            <button className="btn">
                                <a>Sign up</a>
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