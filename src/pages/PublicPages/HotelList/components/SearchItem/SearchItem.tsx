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
                <span className="siTaxiOp">Taxi gratis desde el aereopuerto</span>
                <span className="siSubtitle">
                    Apartamento tipo estudio con aire acondicionado
                </span>
                <span className="siFeatures">
                    {item.description}
                </span>
                <span className="siCancelOp">Cancelación gratis! </span>
                <span className="siCancelOpSubtitle">
                    Cancela en cualquier momento, no dejes que este precio se te escape!
                </span>
            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Excelente</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="siDetailTexts">
                    <span className="siPrice">${item.cheapestPrice} MXN</span>
                    <span className="siTaxOp">Incluye impuestos y honorarios</span>
                    <button className="siCheckButton" onClick={handleOnClick}>Ver disponibilidad</button>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
