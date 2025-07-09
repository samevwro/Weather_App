
type DataNameType = {
    weatherData: any[]
    LocationList: any[]
    selectedLocation: number
}
//This function is to create a dynamice title for the data table to match the location
export function DataName({weatherData, LocationList, selectedLocation}: DataNameType) {
        if (weatherData.length != 0) {
            return LocationList[selectedLocation].city + " " + LocationList[selectedLocation].state + " on "+ weatherData[0].list[0].dt_txt.substring(0, 10)
        } else { return "Loading..." }
    }