import "../../../../styles/css/hotelReview.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../../context/SearchContext";
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { BASE_URL, HotelInfo } from "../../../models";
import useFetch from "../../../hooks/useFetch";
import Navbar from "../../../Components/Navbar";
import Reserve from "../../../Components/Reserve";

// Icons
import { TbCircleX } from 'react-icons/tb';
import { TbCircleArrowRight } from 'react-icons/tb';
import { TbCircleArrowLeft } from 'react-icons/tb';

const HotelReview = () => {

    // State variables
    const [slideNumber, setSlideNumber] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [hotel, setHotel] = useState<any>([])

    // Related to params
    const obj = useParams();
    const hotelId: string = String(obj.id);

    const { data, loading, error, reFetch } = useFetch(`${BASE_URL}/hotels/${hotelId}`);
    useEffect(() => {
        setHotel(data)
    }, [data])
    const { dates, options } = useDataContext();

    const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = (date1: Date, date2: Date) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const daysDiff = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
        return daysDiff;
    }

    const daysDiff = dayDifference(dates[0].endDate, dates[0].startDate);
    const totalPrice = (hotel.cheapestPrice * daysDiff * options.room).toFixed(2);


    const handleOpen = (i: any) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction: any) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? hotel.photos.length - 1 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === hotel.photos.length - 1 ? 0 : slideNumber + 1;
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
                                    <img src={hotel.photos[slideNumber]} alt="" className="sliderImg" />
                                </div>
                                <TbCircleArrowRight
                                    className="arrow"
                                    onClick={() => handleMove("r")}
                                />
                            </div>
                        )}
                        <div className="hotelWrapper">
                            <button className="bookNow">Reserve or Book Now!</button>
                            <h1 className="hotelTitle">{hotel.name}</h1>
                            <div className="hotelAddress">
                                {/* <FontAwesomeIcon icon={faLocationDot} /> */}
                                <span>{hotel.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location – {hotel.distance}km from center
                            </span>
                            <span className="hotelPriceHighlight">
                                Book a stay over ${hotel.cheapestPrice} at this property and get a free airport taxi
                            </span>
                            <div className="hotelImages">
                                {hotel.photos?.map((photo: string, i: any) => (
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
                                    <h1 className="hotelTitle">{hotel.title}</h1>
                                    <p className="hotelDesc">
                                        {hotel.description}
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
