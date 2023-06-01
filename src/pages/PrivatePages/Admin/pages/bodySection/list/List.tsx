import { GridColDef } from "@mui/x-data-grid";
import "../../../../../../../styles/css/list.css";
import Datatable from "../../../components/datatable/Datatable";

type Props = {
    columns: GridColDef<{}>[]
}

const List = ({ columns }: Props) => {
    return (
        <div className="list">
            <div className="listContainer">
                <Datatable columns={columns} />
            </div>
        </div>
    )
}

export default List