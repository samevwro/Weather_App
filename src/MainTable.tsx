import { useEffect } from "react"
import { WeatherTable } from "./WeatherTableData"
import { DataName } from "./DataName"

type MainTableProps = {
    selectedLocation: number
    LocationList: any[]
    weatherData: any[]
    setWeatherData: (value: any)=>void
    
}

export function MainTable({ setWeatherData, selectedLocation, LocationList, weatherData }: MainTableProps) {
    
    //This fetchs new data when the searched location updates or if more data is added to the location List 
      useEffect(() => {
        const asyncWeatherFunction = async () => {
        //this is the weather forecast api to retrive the projected forecast
          const CurrentLatitude = LocationList[selectedLocation].latitude
          const CurrentLongitude = LocationList[selectedLocation].longitude
          const url = `https://weather-api167.p.rapidapi.com/api/weather/forecast?lon=${CurrentLongitude}&lat=${CurrentLatitude}&cnt=10&units=imperial&type=three_hour&mode=json&lang=en`;
         
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
            setWeatherData([result])
          } catch (error) {
            console.error(error);
          }
    
        }
        asyncWeatherFunction()
      }, [LocationList, selectedLocation])
    
    return (
        <div >
            <div className="d-flex justify-content-center">
                <h3>The current Forcast for {<DataName LocationList={LocationList} selectedLocation={selectedLocation} weatherData={weatherData}/>}</h3>
            </div>
            <div className="d-flex justify-content-center">
                <table className="table table-striped" id="DynamicTable">
                    <thead><tr>
                        <th>Time</th>
                        <th>Temprature</th>
                        <th>Humidity</th>
                        <th>Cloudiness</th>
                        <th>Rain</th>
                        <th>Summary</th>
                    </tr></thead>
                    <tbody>
                      <WeatherTable weatherData={weatherData}/>
                    </tbody>
                </table>
            </div>
        </div>
    )
}