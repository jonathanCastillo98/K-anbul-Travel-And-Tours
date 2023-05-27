import "../../../../../../styles/css/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../../../hooks/useFetch";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../redux/store";
import { BASE_URL } from "../../../../../models";

const Datatable = ({ columns }) => {
  // To navigate other parte of the app
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.split("/")[3];

  // Routes
  const toNewEntity = location.pathname && `/private/admin/${path}/new`
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`${BASE_URL}/${path}/`);
  const userState = useSelector((store: AppStore) => store.user);
  const token = userState.token;

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
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

      setList(list.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error)
    }
  };

  const handleView = (id) => {
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
      renderCell: (params) => {
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
        pageSize={3}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default Datatable;