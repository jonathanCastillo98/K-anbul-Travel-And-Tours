import { useLocation, useParams } from "react-router-dom";
import "../../../../../../../styles/css/single.css";
import useFetch from "../../../../../../hooks/useFetch";
import { BASE_URL } from "../../../../../../models";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";

const Single = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    const { id } = useParams();
    const { data, loading, error } = useFetch(`${BASE_URL}/${path}/${id}`)
    console.log(data)

    return (
        <div className="single">
            <div className="singleContainer">
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img
                                src={data.img}
                                alt=""
                                className="itemImg"
                            />
                            <div className="details">
                                <h1 className="itemTitle">{data.username}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{data.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{data.phone}</span>
                                </div>
                                {data.address && <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">
                                        {data.address}
                                    </span>
                                </div>}
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">{data.country}</span>
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