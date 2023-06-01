import "../../../../../../../styles/css/new.css";

import { BaseSyntheticEvent, useState } from "react";
import { BASE_URL, InputInfo, UserInfo } from "../../../../../../models";
import axios from "axios";

// Icons
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

type Props = {
    inputs: {}[],
    title: string,
}

const New = ({ inputs, title }: Props) => {
    const [file, setFile] = useState<string | any>("");
    const [info, setInfo] = useState<UserInfo | {}>({});

    const handleChange = (e: BaseSyntheticEvent) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/jonathancastillo/image/upload",
                data
            );

            const { url } = uploadRes.data;
            const newUser = {
                ...info,
                img: url,
            };

            await axios.post(`${BASE_URL}/auth/register`, newUser);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e: BaseSyntheticEvent) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {inputs.map((input: InputInfo | any) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                    />
                                </div>
                            ))}
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;