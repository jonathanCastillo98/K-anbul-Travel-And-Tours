import "../../../../../../../styles/css/newRoom.css";

import { roomInputs } from "../../../../../../formSource";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../../redux/store";
import { BASE_URL, HotelInfo, HotelRoomInfo, RoomInfo, UserInfo } from "../../../../../../models";
import { BaseSyntheticEvent, useState } from "react";
import axios from "axios";
import useFetch from "../../../../../../hooks/useFetch";

const NewRoom = () => {
    const [info, setInfo] = useState<HotelRoomInfo | {}>({});
    const [hotelId, setHotelId] = useState<string | undefined>(undefined);
    const [rooms, setRooms] = useState<any>();

    const { data, loading, error } = useFetch(`${BASE_URL}/hotels`);
    const userState: UserInfo = useSelector((store: AppStore) => store.user);
    const token: string = userState.token;


    const handleChange = (e: BaseSyntheticEvent) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const roomNumbers = rooms?.split(",").map((room: RoomInfo) => ({ number: room }));
        try {
            console.log(hotelId)
            await axios.post(`${BASE_URL}/rooms/${hotelId}`, { ...info, roomNumbers }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>Crear nuevo cuarto:</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {roomInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Cuartos</label>
                                <textarea
                                    onChange={(e: BaseSyntheticEvent) => setRooms(e.target.value)}
                                    placeholder="Separar con una coma los números de cuarto."
                                />
                            </div>
                            <div className="formInput">
                                <label>Elegir hotel</label>
                                <select
                                    id="hotelId"
                                    onChange={(e) => setHotelId(e.target.value)}
                                >
                                    {loading
                                        ? "loading"
                                        : data &&
                                        data.map((hotel: HotelInfo) => (
                                            <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                                        ))}
                                </select>
                            </div>
                            <button onClick={handleClick}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewRoom;