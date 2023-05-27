import { TbCircleX } from 'react-icons/tb'
import '../../../styles/css/reserve.css'
import useFetch from '../../hooks/useFetch'
import { useState } from 'react'
import { useDataContext } from '../../context/SearchContext'
import axios from 'axios'
import { BASE_URL } from '../../models'

type Props = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    hotelId: number,
}

const Reserve = ({ setOpenModal, hotelId }: Props) => {

    const { data, loading, error } = useFetch(`${BASE_URL}/hotels/room/${hotelId}`);
    const { dates } = useDataContext();

    const getDatesInRange = (startDate: Date, endDate: Date) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        let dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1)
        }

        return dates
    }

    const allDates = (getDatesInRange(dates[0].startDate, dates[0].endDate));

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date =>
            allDates.includes(new Date(date).getTime())
        );
        return !isFound;
    }

    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleSelected = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    }
    console.log(selectedRooms)

    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                axios.put(`http://localhost:3000/api/v1/rooms/availability/${roomId}`, { dates: allDates });
            }))
            setOpenModal(false)
        } catch (error) {

        }
    }

    return (
        <div className='reserve'>
            <div className="reserveContainer">
                <TbCircleX
                    className="reserveClose"
                    onClick={() => setOpenModal(false)}
                />
                <span>Select your rooms:</span>
                {data.map((item: any) => (
                    <div className="rItem" key={item.id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDescription">{item.description}</div>
                            <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectedRooms">
                            {item.roomNumbers.map((roomNumber: any) => (
                                <div className="room" key={roomNumber.number}>
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type='checkbox'
                                        value={roomNumber.roomId}
                                        onChange={handleSelected}
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button disabled={selectedRooms.length !== 0 ? false : true} onClick={handleClick} className='rButton'>Reserve now!</button>
            </div>
        </div>
    )
}
export default Reserve