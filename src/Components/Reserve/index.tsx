import '../../../styles/css/reserve.css';

import { BaseSyntheticEvent, useState } from 'react';
import { useDataContext } from '../../context/SearchContext';
import { BASE_URL, HotelRoomInfo, RoomInfo } from '../../models';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

// Icons
import { TbCircleX } from 'react-icons/tb';


type Props = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    hotelId: number,
}

const Reserve = ({ setOpenModal, hotelId }: Props) => {

    const { data, loading, error } = useFetch(`${BASE_URL}/hotels/room/${hotelId}`);
    const { dates } = useDataContext();

    // State variables
    const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

    const getDatesInRange = (startDate: Date, endDate: Date) => {
        const start: Date = new Date(startDate);
        const end: Date = new Date(endDate);
        const date: Date = new Date(start.getTime());
        let dates: number[] = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1)
        }

        return dates
    }

    const allDates: number[] = (getDatesInRange(dates[0].startDate, dates[0].endDate));

    const isAvailable = (roomNumber: RoomInfo) => {
        const isFound = roomNumber.unavailableDates.some(date =>
            allDates.includes(new Date(date).getTime())
        );
        return !isFound;
    }

    // Handlers
    const handleSelected = (e: BaseSyntheticEvent) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    }

    const handleClick = async (): Promise<void> => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                axios.put(`${BASE_URL}/rooms/availability/${roomId}`, { dates: allDates });
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
                <span>Selecciona tus habitaciones:</span>
                {data.map((item: HotelRoomInfo) => (
                    <div className="rItem" key={item.id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDescription">{item.description}</div>
                            <div className="rMax">Max Personas: <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectedRooms">
                            {item.roomNumbers.map((roomNumber: RoomInfo) => (
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
                <button disabled={selectedRooms.length !== 0 ? false : true} onClick={handleClick} className='rButton'>Reserva ahora!</button>
            </div>
        </div>
    )
}
export default Reserve