import { useEffect, useState } from "react"
import AirQualityChart from "./AirQualityChart"


type AirQualityTypes = {
    LocationList: any[]
    selectedLocation: number
}



export function AirQuality({ LocationList, selectedLocation }: AirQualityTypes) {
    const [AirQualityData, setAirQualityData] = useState<any[]>([])

    const [LocationCoordinates, setLocationCoordinates] = useState({
        longitude: "",
        latitude: ""
    })
    const LocationLoader = () => {
        if (LocationList.length != 0) {
            setLocationCoordinates({
                longitude: `${LocationList[selectedLocation].longitude}`,
                latitude: `${LocationList[selectedLocation].latitude}`
            })
        }else{return}

    }
    useEffect(() => {
        LocationLoader()
    }, [LocationList, selectedLocation])

    /*const CurrentLatitude = LocationList[selectedLocation].latitude
    const CurrentLongitude = LocationList[selectedLocation].longitude*/
    //Using the same api for the weather here to retrive the air quality instead of the forecast
    useEffect(() => {

        const AirQualityApi = async () => {
            const url = `https://weather-api167.p.rapidapi.com/api/weather/air_pollution?lat=${LocationCoordinates.latitude}&lon=${LocationCoordinates.longitude}&type=current`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_WEATHER_API_KEY,
                    'x-rapidapi-host': 'weather-api167.p.rapidapi.com',
                    Accept: 'application/json'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                if (!response.ok) {
                    return
                } else {
                    setAirQualityData([result])
                }

            } catch (error) {
                console.error(error);
            }
        }
        AirQualityApi()
    }, [LocationCoordinates])
//this function formates the data into an array to be passed into my chart component
    const ifAirDataReady = () => {
        console.log(AirQualityData)
        if (AirQualityData.length !== 0) {

            const arrayFormat = Object.entries(AirQualityData[0].list[0].components).map(([key, value]) => ({ id: key, data: value }));
            const finalArrayFormat = arrayFormat.slice(0, -1)

            //I created a dynamic chart to make the air quality data more readable
            return (<>
                <div className="d-flex justify-content-center"><h2>Air Quality Chart For {LocationList[selectedLocation].city} {LocationList[selectedLocation].state}</h2></div>
                <div style={{ width: "75%", height: "500px" }}>
                    <div className="chart">
                        <AirQualityChart data={finalArrayFormat} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h4>The Air Quality Is {AirQualityData[0].list[0].main.air_quality} Today</h4>
                    </div>

                    <div style={{ margin: "20px" }} className="d-flex justify-content-center">
                        <table>
                            <thead>
                                <th>Co</th>
                                <th>No</th>
                                <th>No2</th>
                                <th>O3</th>
                                <th>So2</th>
                                <th>Pm2_5</th>
                                <th>Pm10</th>
                                <th>Nh3</th>
                            </thead>
                            <tbody>
                                <td>Carbon Monoxide</td>
                                <td>Nitric Oxide</td>
                                <td>Nitorgen Dioxide</td>
                                <td>Ozone</td>
                                <td>Sulfer Dioxide</td>
                                <td>particulate matter that<br />
                                    is 2.5 micrometers or less in diameter</td>
                                <td>particulate matter that<br />
                                    is 10 micrometers or less in diameter</td>
                                <td>Ammonia</td>
                            </tbody>
                        </table>
                    </div>

                </div>
            </>
            )
        } else {
            return <h3>Loading...</h3>
        }
    }



    return (
        <div>{ifAirDataReady()}</div>
    )
}