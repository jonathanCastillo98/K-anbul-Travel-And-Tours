import '../../../styles/css/main.css'

import mockData from './data'
import useFetch from '../../hooks/useFetch'

import { HiOutlineLocationMarker } from 'react-icons/hi'
import { HiOutlineClipboardCheck } from 'react-icons/hi'

const Main = () => {
    const { data, loading, error } = useFetch("http://localhost:3000/api/v1/hotels/countByCity?cities=Merida,Motul");

    console.log(data)
    return (
        <section className="main container section">

            <div className="secTitle">
                <h3 className="title">Most visited destinations</h3>
            </div>

            <div className="secContent grid">
                {
                    mockData.map(({ id, imgSrc, destTitle, location, grade, fees, description }) => {
                        return (
                            <div key={id} className="singleDestination">

                                <div className="imageDiv">
                                    <img src={imgSrc} alt={destTitle} />
                                </div>

                                <div className="cardInfo">
                                    <h4 className="destTitle">{destTitle}</h4>
                                    <span className="continent flex">
                                        <HiOutlineLocationMarker className="icon" />
                                        <span className="name">{location}</span>
                                    </span>

                                    <div className="fees flex">

                                        <div className="grade">
                                            <span>{grade}<small>+1</small></span>
                                        </div>

                                        <div className="price">
                                            <h5>{fees}</h5>
                                        </div>

                                    </div>

                                    <div className="desc">
                                        <p>{description}</p>
                                    </div>

                                    <button className="btn flex">
                                        DETAILS <HiOutlineClipboardCheck className="icon" />
                                    </button>

                                </div>

                            </div>
                        )
                    })
                }
            </div>

        </section>
    )
}

export default Main