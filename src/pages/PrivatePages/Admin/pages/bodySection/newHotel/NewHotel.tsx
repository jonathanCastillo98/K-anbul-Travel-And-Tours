import "../../../../../../../styles/css/newHotel.css";

import { BaseSyntheticEvent, useState } from "react";
import { hotelInputs } from "../../../../../../formSource";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../../redux/store";
import { BASE_URL, HotelInfo, HotelRoomInfo, RoomInfo, UserInfo } from "../../../../../../models";
import axios from "axios";
import useFetch from "../../../../../../hooks/useFetch";

// Icons
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const NewHotel = () => {
    // State variables
    const [files, setFiles] = useState<string | any>("");
    const [info, setInfo] = useState<HotelInfo | {}>({});
    const [rooms, setRooms] = useState<string[]>([]);

    const { data, loading, error } = useFetch(`${BASE_URL}/rooms`);
    const userState: UserInfo = useSelector((store: AppStore) => store.user);
    const token: string = userState.token;

    // Handlers
    const handleChange = (e: BaseSyntheticEvent) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSelect = (e: BaseSyntheticEvent) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option: any) => option.value
        );
        setRooms(value);
    };

    const handleClick = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file: any) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/jonathancastillo/image/upload",
                        data
                    );

                    const { url } = uploadRes.data;
                    return url;
                })
            );

            const newhotel = {
                ...info,
                rooms,
                photos: list,
            };
            const listhotels = await axios.post(`${BASE_URL}/hotels`, newhotel, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },


            });
        } catch (err) { console.log(err) }
    };
    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>Crear nuevo hotel</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                files
                                    ? URL.createObjectURL(files[0])
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Imagen: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {hotelInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Favorito</label>
                                <select id="featured" onChange={handleChange}>
                                    <option value={"false"}>No</option>
                                    <option value={"true"}>Si</option>
                                </select>
                            </div>
                            <div className="selectRooms">
                                <label>Cuartos</label>
                                <select id="rooms" multiple onChange={handleSelect}>
                                    {loading
                                        ? "loading"
                                        : data &&
                                        data.map((room: HotelRoomInfo) => (
                                            <option key={room.id} value={room.id}>
                                                {room.title}
                                            </option>
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

export default NewHotel;