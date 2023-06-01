import "../../../../../../../styles/css/single.css";

import { useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../../../models";
import useFetch from "../../../../../../hooks/useFetch";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";
import { useEffect, useState } from "react";

const Single = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[3];

    // State variables
    const [item, setItem] = useState<any>([]);

    const { id } = useParams();
    const { data, loading, error } = useFetch(`${BASE_URL}/${path}/${id}`)

    useEffect(() => {
        setItem(data)
    }, [data])


    return (
        <div className="single">
            <div className="singleContainer">
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img
                                src={item.img}
                                alt=""
                                className="itemImg"
                            />
                            <div className="details">
                                <h1 className="itemTitle">{item.username}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{item.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{item.phone}</span>
                                </div>
                                {item.address && <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">
                                        {item.address}
                                    </span>
                                </div>}
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">{item.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <List />
                </div>
            </div>
        </div>
    );
};

export default Single;