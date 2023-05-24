import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";

const useFetch = (url:string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const userState = useSelector((store: AppStore) => store.user);
    const token = userState.token;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(res.data)
            } catch (error) {
                setError(error)
                setData([])
            }
            setLoading(false)
        };
        fetchData();
    },[url]);
    
    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url);
            setData(res.data)
        } catch (error) {
            setError(error)
            setData([])
        }
        setLoading(false)
    };
    return {data, loading, error, reFetch};   
};

export default useFetch;