import { convertTime } from "./ConverTime"

type WeatherDataType = {
    weatherData: any[]
}

//This is to map out each weather data point to fit into the data table for the user to see
 export function WeatherTable({weatherData}: WeatherDataType) {
        if (weatherData.length != 0) {
            return (weatherData[0].list.map((data: any) =>
                <tr>
                    <td > {convertTime(data.dt_txt.substring(11).toString())}</td>
                    <td>{data.main.temprature + " °F"}</td>
                    <td>{data.main.humidity + "%"}</td>
                    <td>{data.clouds.cloudiness + "%"}</td>
                    <td>{data.rain.amount === 0 ? data.snow.amount + " in" : data.rain.amount + " in"}</td>
                    <td style={{ width: "30%" }}>It's going to be {data.summery}</td>
                </tr>
            )
            )

        } else { return "Loading..." }
    }
