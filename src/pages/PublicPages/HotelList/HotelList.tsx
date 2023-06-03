import "../../../../styles/css/hotelList.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useDataContext } from "../../../context/SearchContext";
import { BASE_URL } from "../../../models";

import Navbar from "../../../Components/Navbar";
import SearchItem from "./components/SearchItem/SearchItem";
import useFetch from "../../../hooks/useFetch";

const HotelList = () => {
    const { destination,
        setDestination,
        dates,
        setDates,
        options,
        setOptions
    } = useDataContext();

    const location = useLocation();

    // State variables
    const [openDate, setOpenDate] = useState(false);
    const [min, setMin] = useState<string | undefined>(undefined);
    const [max, setMax] = useState<string | undefined>(undefined);

    const { data, loading, error, reFetch } = useFetch(`${BASE_URL}/hotels?city=${destination}&min=${min || 0}&max=${max || 10000}`);

    const handleOnClick = () => {
        reFetch();
    }

    return (<>
        <Navbar />
        <div className="wrapper" onClick={() => {
            setOpenDate(false)
        }}>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destino</label>
                            <input placeholder={destination} type="text" onChange={(e) => setDestination(e.target.value)} />

                        </div>
                        <div className="lsItem">
                            <label>Fecha de entrada</label>
                            <span onClick={(e) => {
                                e.stopPropagation()
                                setOpenDate(!openDate)
                            }}>{`${format(
                                dates[0].startDate,
                                "dd/MM/yyyy"
                            )} al ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                            {openDate && (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <DateRange
                                        onChange={(item: any) => setDates([item.selection])}
                                        minDate={new Date()}
                                        ranges={dates}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="lsItem">
                            <label>Opciones</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Precio min <small>por noche</small>
                                    </span>
                                    <input type="number" className="lsOptionInput" onChange={e => setMin(e.target.value)} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Precio max <small>por noche</small>
                                    </span>
                                    <input type="number" className="lsOptionInput" onChange={e => setMax(e.target.value)} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adultos</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={String(options.adult)}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Niños</span>
                                    <input
                                        type="number"
                                        min={0}
                                        className="lsOptionInput"
                                        placeholder={String(options.children)}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Cuartos</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={String(options.room)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleOnClick}>Buscar</button>
                    </div>
                    <div className="listResult">
                        {loading ? "Loading" : <>
                            {data.map((item: any) => (
                                <SearchItem item={item} key={item.id} />
                            ))}

                        </>}
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default HotelList;
