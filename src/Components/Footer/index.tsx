import '../../../styles/css/footer.css'

// Assets
import video from '../../assets/playa4.mp4'
import kanbul from '../../assets/kanbul.png'

// Icons
import { FiSend } from 'react-icons/fi'
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
                        <small>Viaja más</small>
                        <h2>Viaja con nosotros</h2>
                    </div>

                    <div className="inputDiv flex">
                        <input type="text" placeholder='Ingresa tu correo' />
                        <button className="btn flex" type='submit'>
                            Enviar <FiSend className="icon" />
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
                            K'anbul Travel and Tours es una agencia de viajes local, que nacio como parte
                            una visión familiar, la cual con el paso del tiempo se ha convertido en la alegría y
                            satisfacción de mucha gente y eso es lo que nos motiva cada dia.
                        </div>

                        <div className="footerSocials flex">
                            <AiFillInstagram className="icon" />
                        </div>
                    </div>

                    <div className="footerLinks grid">
                        <div className="linkGroup">
                            <span className="groupTitle">
                                Nuestra Agencia
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Servicios
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Seguro
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Agencia
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Turismo
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Pagos
                            </li>
                        </div>

                        <div className="linkGroup">
                            <span className="groupTitle">
                                Asociados
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
                    </div>

                    <div className="footerDiv flex">
                        <small>LA MEJOR AGENCIA DE VIAJES</small>
                        <small>COPYRIGHTS RESERVED - JONATHAN</small>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Footer