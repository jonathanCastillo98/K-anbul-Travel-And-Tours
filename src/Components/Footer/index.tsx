import './footer.css'

import video from '../../assets/playa4.mp4'

import { FiSend } from 'react-icons/fi'
import kanbul from '../../assets/kanbul.png'
import { AiFillInstagram } from 'react-icons/ai'
import { FiChevronRight } from 'react-icons/fi'

const Footer = () => {
    return (
        <section className="footer">

            <div className="videoDiv">
                <video src={video} loop autoPlay muted typeof='video/mp4'></video>
            </div>

            <div className="secContent container">
                <div className="contactDiv flex">

                    <div className="text">
                        <small>KEEP IN TOUCH</small>
                        <h2>Travel with us</h2>
                    </div>

                    <div className="inputDiv flex">
                        <input type="text" placeholder='Enter Email Address' />
                        <button className="btn flex" type='submit'>
                            SEND <FiSend className="icon" />
                        </button>
                    </div>

                </div>

                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="#" className="logo flex">
                                <h2><img src={kanbul} alt={kanbul} className="icon" /> K'anbul Travel and Tours </h2>
                            </a>
                        </div>

                        <div className="footerParagraph">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam inventore eos fuga hic cum voluptatem minima, tempore non odio provident nobis ipsam at, doloremque sed cupiditate ipsum in, atque soluta.
                        </div>

                        <div className="footerSocials flex">
                            <AiFillInstagram className="icon" />
                        </div>
                    </div>

                    <div className="footerLinks grid">
                        <div className="linkGroup">
                            <span className="groupTitle">
                                OUR AGENCY
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Services
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Insurance
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Agency
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Tourism
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Payment
                            </li>
                        </div>

                        <div className="linkGroup">
                            <span className="groupTitle">
                                PARTNERS
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Bookings
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Rentcars
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                HosteWorld
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Trivago
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                TripAdvisor
                            </li>
                        </div>

                        {/* <div className="linkGroup">
                            <span className="groupTitle">
                                LAST MINUTE
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                London
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                California
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Indonesia
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Europe
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Oceania
                            </li>
                        </div> */}
                    </div>

                    <div className="footerDiv flex">
                        <small>BEST TRAVEL WEBSITE THEME</small>
                        <small>COPYRIGHTS RESERVED - JONATHAN</small>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Footer