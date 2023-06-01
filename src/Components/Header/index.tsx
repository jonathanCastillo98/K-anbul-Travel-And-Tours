import '../../../styles/css/header.css';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDataContext } from '../../context/SearchContext';
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

// Assets
import video from '../../assets/playa.mp4'

// Icons
import { GrLocation } from 'react-icons/gr'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiFacebook } from 'react-icons/fi'
import { AiOutlineInstagram } from 'react-icons/ai'
import { IoCalendarOutline } from 'react-icons/io5'
import { BsFillPeopleFill } from 'react-icons/bs'

const Header = () => {

    const { destination,
        setDestination,
        dates,
        setDates,
        options,
        setOptions
    } = useDataContext();

    // State variables
    const [openDate, setOpenDate] = useState<boolean>(false);
    const [openOptions, setOpenOptions] = useState<boolean>(false);

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toHotelList = location.pathname && `/hotels`

    // Handlers
    const handleOnClick = () => {
        navigate(toHotelList, { replace: true });
    }

    const handleOption = (name: string, operation: string) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    useEffect(() => {
        setDates([
            {
                startDate: new Date(),
                endDate: new Date(),
                key: "selection",
            },
        ])

        setOptions({
            adult: 1,
            children: 0,
            room: 1,
        })
    }, [])


    return (
        <section className="home" onClick={() => {
            setOpenDate(false)
            setOpenOptions(false)
        }}>
            <div className="overlay"></div>
            <video src={video} muted autoPlay loop ></video>

            <div className="homeContent container">
                <div className="textDiv">

                    <span className="smallText">El mundo es gigante!</span>

                    <h1 className="homeTitle">Persigue tus sueños</h1>

                </div>

                <div className="cardDiv grid">

                    <div className="destinationInput">
                        <label htmlFor="city">Elige tu destino:</label>
                        <div className="input flex">
                            <input
                                type="text"
                                placeholder='e.g Riviera Maya'
                                onChange={(e) => setDestination(e.target.value)}
                            />
                            <GrLocation className="icon" />
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">Seleccione sus fechas:</label>
                        <div className="input flex inputFlex" onClick={(e) => {
                            e.stopPropagation()
                            setOpenDate(!openDate)
                        }}>
                            <span
                                className="headerSearchText"
                            >{`${format(dates[0].startDate, "dd/MM/yyyy")} al ${format(
                                dates[0].endDate,
                                "dd/MM/yyyy"
                            )}`}</span>

                            <IoCalendarOutline className='icon' />
                        </div>
                    </div>

                    <div className="optionsInput">
                        <label htmlFor="optionsHTML">Opciones:</label>
                        <div className="input flex inputFlex" onClick={(e) => {
                            e.stopPropagation()
                            setOpenOptions(!openOptions)
                        }}>
                            <span
                                className="headerSearchText"
                            >{`${options.adult} adultos · ${options.children} niños · ${options.room} cuartos`}</span>
                            <BsFillPeopleFill className="icon" />
                            {openOptions && (
                                <div className="options" onClick={(e) => e.stopPropagation()}>
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.adult <= 1}
                                                className="optionCounterButton"
                                                onClick={() => handleOption("adult", "d")}
                                            >
                                                -
                                            </button>
                                            <span className="optionCounterNumber">
                                                {options.adult}
                                            </span>
                                            <button
                                                className="optionCounterButton"
                                                onClick={() => handleOption("adult", "i")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.children <= 0}
                                                className="optionCounterButton"
                                                onClick={() => handleOption("children", "d")}
                                            >
                                                -
                                            </button>
                                            <span className="optionCounterNumber">
                                                {options.children}
                                            </span>
                                            <button
                                                className="optionCounterButton"
                                                onClick={() => handleOption("children", "i")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.room <= 1}
                                                className="optionCounterButton"
                                                onClick={() => handleOption("room", "d")}
                                            >
                                                -
                                            </button>
                                            <span className="optionCounterNumber">
                                                {options.room}
                                            </span>
                                            <button
                                                className="optionCounterButton"
                                                onClick={() => handleOption("room", "i")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="searchOptions flex" onClick={handleOnClick}>
                        <AiOutlineSearch className='icon' />
                        <span>SEARCH</span>
                    </div>

                    {openDate && (
                        <div className="calendarFlex" onClick={(e) => e.stopPropagation()}>
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item: any) => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                className="date"
                                minDate={new Date()}
                                months={2}
                                direction={window.matchMedia("(max-width: 700px)").matches ? 'vertical' : 'horizontal'}

                            />
                        </div>
                    )}

                </div>

                <div className="homeFooterIcons flex">

                    <div className="rightIcons">
                        <FiFacebook className="icon" />
                        <AiOutlineInstagram className="icon" />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Header;