import "../../../../../../../styles/css/newRoom.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import useFetch from "../../../../../../hooks/useFetch";
import { roomInputs } from "../../../../../../formSource";

const NewRoom = () => {
    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);

    const { data, loading, error } = useFetch("/hotels");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        try {
            await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
        } catch (err) {
            console.log(err);
        }
    };

    console.log(info)
    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>Add New Room</h1>
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
                                <label>Rooms</label>
                                <textarea
                                    onChange={(e) => setRooms(e.target.value)}
                                    placeholder="give comma between room numbers."
                                />
                            </div>
                            <div className="formInput">
                                <label>Choose a hotel</label>
                                <select
                                    id="hotelId"
                                    onChange={(e) => setHotelId(e.target.value)}
                                >
                                    {loading
                                        ? "loading"
                                        : data &&
                                        data.map((hotel) => (
                                            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                                        ))}
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewRoom;