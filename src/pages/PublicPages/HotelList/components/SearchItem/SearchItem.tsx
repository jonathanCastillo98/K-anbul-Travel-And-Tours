import "../../../../../../styles/css/searchItem.css";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    item: any
}

const SearchItem = ({ item }: Props) => {

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toHotelInfo = location.pathname && `${item.id}`

    const handleOnClick = () => {
        navigate(toHotelInfo, { replace: true });
    }

    return (
        <div className="searchItem">
            <img
                src={item.photos[0]}
                alt=""
                className="siImg"
            />
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance} km del centro</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="siFeatures">
                    {item.description}
                </span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="siDetailTexts">
                    <span className="siPrice">${item.cheapestPrice} MXN</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <button className="siCheckButton" onClick={handleOnClick}>See availability</button>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
