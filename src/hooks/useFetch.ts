import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { UserInfo } from "../models";
import axios from 'axios';

const useFetch = (url:string) => {
    const [data, setData] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | unknown>();
    const userState:UserInfo = useSelector((store: AppStore) => store.user);
    const token:string = userState.token;

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