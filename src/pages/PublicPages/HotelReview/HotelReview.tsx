import "../../../../styles/css/hotelReview.css";
import Navbar from "../../../Components/Navbar";

import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { TbCircleX } from 'react-icons/tb';
import { TbCircleArrowRight } from 'react-icons/tb';
import { TbCircleArrowLeft } from 'react-icons/tb';
import { useDataContext } from "../../../context/SearchContext";
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import Reserve from "../../../Components/Reserve";

const HotelReview = () => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // Related to params
    const obj = useParams();
    const hotelId = String(obj.id);

    // ME quede donde tengo que hacer fetch al hotel pero necesito el parametro, hay una mejor opcion que la del <video!!!></video!!!>
    const { data, loading, error, reFetch } = useFetch(`http://localhost:3000/api/v1/hotels/${hotelId}`);

    const { dates, options } = useDataContext();

    const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = (date1: Date, date2: Date) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const daysDiff = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
        return daysDiff;
    }

    const daysDiff = dayDifference(dates[0].endDate, dates[0].startDate);
    const totalPrice = (data.cheapestPrice * daysDiff * options.room).toFixed(2);


    const handleOpen = (i: any) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction: any) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber)
    };

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toLogin = location.pathname && `/login`


    const userState = useSelector((store: AppStore) => store.user);

    const handleOnReserve = () => {
        if (userState.token) {
            setOpenModal(true);
        } else {
            navigate(toLogin, { replace: true });
        }
    }
    return (<>
        <Navbar />
        <div className="wrapperHotel">
            {loading ? ("Loading") :
                (
                    <div className="hotelContainer">
                        {open && (
                            <div className="slider">
                                <TbCircleX
                                    className="close"
                                    onClick={() => setOpen(false)}
                                />
                                <TbCircleArrowLeft
                                    className="arrow"
                                    onClick={() => handleMove("l")}
                                />
                                <div className="sliderWrapper">
                                    <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                                </div>
                                <TbCircleArrowRight
                                    className="arrow"
                                    onClick={() => handleMove("r")}
                                />
                            </div>
                        )}
                        <div className="hotelWrapper">
                            <button className="bookNow">Reserve or Book Now!</button>
                            <h1 className="hotelTitle">{data.name}</h1>
                            <div className="hotelAddress">
                                {/* <FontAwesomeIcon icon={faLocationDot} /> */}
                                <span>{data.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location – {data.distance}km from center
                            </span>
                            <span className="hotelPriceHighlight">
                                Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                            </span>
                            <div className="hotelImages">
                                {data.photos?.map((photo, i) => (
                                    <div className="hotelImgWrapper" key={i}>
                                        <img
                                            onClick={() => handleOpen(i)}
                                            src={photo}
                                            alt=""
                                            className="hotelImg"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="hotelDetails">
                                <div className="hotelDetailsTexts">
                                    <h1 className="hotelTitle">{data.title}</h1>
                                    <p className="hotelDesc">
                                        {data.description}
                                    </p>
                                </div>
                                <div className="hotelDetailsPrice">
                                    <h1>Perfect for a {daysDiff}-night stay!</h1>
                                    <span>
                                        Located in the real heart of Krakow, this property has an
                                        excellent location score of 9.8!
                                    </span>
                                    <h2>
                                        <b>${totalPrice}</b> ({daysDiff} nights)
                                    </h2>
                                    <button onClick={handleOnReserve}>Reserve or Book Now!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {openModal && <Reserve setOpenModal={setOpenModal} hotelId={Number(hotelId)} />}
        </div>
    </>
    );
};

export default HotelReview;
