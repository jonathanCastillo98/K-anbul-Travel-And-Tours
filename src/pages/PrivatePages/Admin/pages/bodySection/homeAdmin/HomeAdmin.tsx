import "../../../../../../../styles/css/homeAdmin.css"
import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/featured/Featured";
import Chart from "../../../components/chart/Chart";
import Table from "../../../components/table/Table";

const HomeAdmin = () => {
    return (
        <div className="homeAdmin">
            <div className="homeContainer">
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="earning" />
                    <Widget type="balance" />
                </div>
                <div className="charts">
                    <Featured />
                    <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
                </div>
            </div>
        </div>
    );
};

export default HomeAdmin;