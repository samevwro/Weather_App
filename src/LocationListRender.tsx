import { type LocationData } from "./App"

type renderTypes = {
    LocationList: any[]
}


export function LocationListRender({LocationList}: renderTypes) {
    //this variable is what creates each location for the drop down dynamically
    
    const locationList = LocationList.map((location: LocationData) =>
        <option value={location.id} key={location.id}>{location.city} {location.isStared? "⭐": ""}</option>
    )

    return locationList
}