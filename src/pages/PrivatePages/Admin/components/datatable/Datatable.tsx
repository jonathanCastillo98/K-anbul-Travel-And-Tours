import "../../../../../../styles/css/datatable.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../redux/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BASE_URL, HotelInfo, HotelRoomInfo, UserInfo } from "../../../../../models";
import useFetch from "../../../../../hooks/useFetch";
import axios from "axios";

type Props = {
  columns: GridColDef<{}>[],
}

const Datatable = ({ columns }: Props) => {
  // To navigate other parte of the app
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.split("/")[3];

  // Routes
  const toNewEntity = location.pathname && `/private/admin/${path}/new`;

  // State variables
  const [list, setList] = useState([]);

  const { data, loading, error } = useFetch(`${BASE_URL}/${path}/`);

  const userState: UserInfo = useSelector((store: AppStore) => store.user);
  const token: string = userState.token;

  useEffect(() => {
    setList(data);
  }, [data]);

  // Handlers
  const handleDelete = async (id: number) => {
    try {
      if (path !== "rooms") {
        await axios.delete(`${BASE_URL}${path}/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        await axios.delete(`${BASE_URL}${path}/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      setList(list.filter((item: UserInfo | HotelInfo | HotelRoomInfo) => item.id !== id));
    } catch (error) {
      console.error(error)
    }
  };

  const handleView = (id: string) => {
    try {
      navigate(`/private/admin/${path}/${id}`, { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <div className="viewButton"
              onClick={() => handleView(params.row.id)}
            >View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path.toUpperCase()}
        <span onClick={() => {
          navigate(toNewEntity, { replace: true });
        }} className="link">
          Add New
        </span>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        checkboxSelection
        getRowId={(row: any) => row.id}
      />
    </div>
  );
};

export default Datatable;