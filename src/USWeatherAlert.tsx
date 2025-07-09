import { useEffect, useState } from "react"
import { AlertData } from "./AlertData"


type WeatherAlertType = {
    LocationList: any[]
    selectedLocation: number
}
//this type is to make accessing the data from the weather api easier and not tedious
type WeatherAlertDataType = {
    alertDescription: string,
    alertStatus: string,
    areaDescription: string,
    category: string,
    certainty: string,
    effectiveTime: string,
    endTime: string,
    eventTitle: string,
    expirationTime: string,
    headline: string,
    messageType: string,
    onsetTime: string,
    responseActions: string,
    safetyInstructions: string,
    sentTime: string,
    severity: string,
    urgency: string
}

export function UsWeatherAlert({ LocationList, selectedLocation }: WeatherAlertType) {
    const [WeatherAlertData, setWeatherAlert] = useState([] as WeatherAlertDataType[])
    const [selLocation, setSelLocation] = useState(0)
    //another call to the weather api this time for the Us national alerts
    useEffect(() => {
        const WeatherAlert = async () => {
            const url = `https://weather-api167.p.rapidapi.com/api/weather/us/alert?status=actual%2Cexercise%2Csystem%2Ctest%2Cdraft&message_type=alert%2Cupdate%2Ccancel&area=${LocationList[selectedLocation].state}&urgency=Immediate%2CExpected&severity=Extreme%2CSevere%2CModerate&certainty=Observed%2CLikely%2CPossible&limit=10`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_WEATHER_API_KEY,
                    'x-rapidapi-host': 'weather-api167.p.rapidapi.com'
                }
            };
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                setWeatherAlert(result)
            } catch (error) {
                console.error(error);
            }
        }
        WeatherAlert()
    }, [selectedLocation, LocationList])
//this variable also maps out the locations for the drop down location selector 
    const AlertLocationList: any = WeatherAlertData.map((area: any, index: number) => {
        return <option className="OptionWidth" value={index} key={index}>{area.areaDescription.substring(0, 100)}</option>
    })
  
    const ChangeLocation = (id: number) => {
        setSelLocation(id)
    }

    return (<>
        <div style={{ margin: "10px" }} className="d-flex">
            <div style={{ margin: "5px"}}><h3>Weather Alert Info For </h3></div>
            <select name="AlertSelect" className="Locations" id="AlertSelect" onChange={(e) => ChangeLocation(Number(e.target.value))}>
                {AlertLocationList}
            </select>
        </div>
        <AlertData WeatherAlertData={WeatherAlertData} selLocation={selLocation}/>
    </>
    )
}