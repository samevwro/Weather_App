import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { MainTable } from './MainTable'
import { useEffect, useState, type ChangeEvent } from 'react'
import { AirQuality } from './AirQuality'
import { ToolBar } from './ToolBar'
import { UsWeatherAlert } from './USWeatherAlert'
//types declared 
export type LocationData = {
  id: number
  zip: string
  city: string
  state: string
  country: string
  isStared: boolean
}
type stateLocationData = {
  zip: string
  city: string
  state: string
  country: string
}
export function App() {
  //Where my state that all pages need to access is stored
  const [selectedLocation, setSelLocation] = useState(0)
  const [LocationSearch, setLocationSearch] = useState<stateLocationData>({
    zip: "",
    city: "",
    state: "",
    country: "",
    
  })
  
  const [LocationSearchValue, setLocationSearchValue] = useState({
    zip: "",
    city: "",
    state: "",
    country: "US"
  })
  const [LocationList, setLocationList] = useState<any[]>([])

  const [weatherData, setWeatherData] = useState<any[]>([])
  const [searchAddressCoordinates, setSearchAddressCoordinates] = useState({
    longitude: "",
    latitude: ""
  })
 

  //This is the JSON data format when adding a new location to the data base
  const JsonValues = {
    id: `${LocationList.length}`, city: `${LocationSearch.city}`,
    state: `${LocationSearch.state}`, zip: String(`${LocationSearch.zip}`),
    country: `${LocationSearch.country}`, longitude: `${searchAddressCoordinates.longitude}`,
    latitude: `${searchAddressCoordinates.latitude}`, iaStared: false
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    setLocationSearchValue({
      ...LocationSearchValue,
      [event.target.name]: String(event.target.value)
    })
  }
  //This function takes the input from the city address and determines if it only has a city name, state, and counrty
  //or if it also has the street name and formats the data for the useState that hold's the data
  const handleInput = (event: any) => {
    const splitInfo = event.split(",")
    const formatInfoState: stateLocationData = {
    zip: "",
    city: `${splitInfo[0]}`,
    state: `${splitInfo[1].substring(1)}`,
    country: `US`
    }
    const formatInfoCity: stateLocationData = {
    zip: "",
    city: `${splitInfo[0]}`,
    state: `${splitInfo[2].substring(1)}`,
    country: `US`
    }
    if(splitInfo[1].length > 3){
      console.log(splitInfo[1].length)
      setLocationSearchValue(formatInfoCity)
    }else{
      setLocationSearchValue(formatInfoState)
    }
    
  }  
  function ChangeSelLocation(id: number) {
    setSelLocation(id)
  }
//these are the loaders for the information needed from some of the Api's used
  const LocationLoader = async () => {
    const response = await fetch("http://localhost:3000/locations")
    const data = await response.json()
    console.log(data)
    setLocationList(data)
    return
}
   useEffect(()=> {
LocationLoader()
   }, [])

  useEffect(()=> {
    const AddressVerification = async () => {
    if(LocationSearch.city.length > 0){
      const object = {
      "address": {
        "regionCode": `${LocationSearch.country}`,
        "postalCode": `${LocationSearch.zip}`,
        "addressLines": `${LocationSearch.city}`
      },
      "enableUspsCass": true
    }
    const key = import.meta.env.VITE_GOOGLE_VERIFICATION_KEY
    console.log(object)
    const response = fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${key}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    if (!(await response).ok) {
      return alert("Incorrect Address entered Please make sure its spelled correctly!")
    }
    const data = (await response).text()
    const AddressObject = JSON.parse(await data)
    const coordinates = setSearchAddressCoordinates({
      longitude: String(await AddressObject.result.geocode.location.longitude),
      latitude: String(await AddressObject.result.geocode.location.latitude)
    })
    coordinates 
    return
  }else {return}
    }
      
  AddressVerification()
  }, [LocationSearch])

//this function updates the currently seleced files isStared data point to add a star to selected locations
//This are my CRUD functions
  const favoriteLocation = async (id: number)=> {
    const entity =  {
      "id": `${id}`,
      "city": `${LocationList[id].city}`,
      "state": `${LocationList[id].state}`,
      "zip": `${LocationList[id].zip}`,
      "country": `${LocationList[id].country}`,
      "longitude": `${LocationList[id].longitude}`,
      "latitude": `${LocationList[id].latitude}`,
      "isStared": LocationList[id].isStared? false: true
    }
    await fetch(`http://localhost:3000/locations/${id}`, {
      method: "PUT",
      body: JSON.stringify(entity),
      headers: {
        "content-type": 'application/json'
      }
    })
  LocationLoader()
  }

const SubmitButton = async () => {
  if(LocationSearchValue.city.length > 0){
    setLocationSearch(LocationSearchValue)
    }else{
      return alert("Input cant be empty ")
    }
  }
 const DeleteButton = async (id: number) =>{
  await fetch(`http://localhost:3000/locations/${id}`, {
    method: "DELETE"
  })
  setSelLocation(0)
  LocationLoader()
 }
 
useEffect(()=> {
  const updateDB = async ()=>{
    if(LocationSearch.city.length != 0){
    await fetch("http://localhost:3000/locations", {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(JsonValues)
    })}}
  updateDB()
  setTimeout(() => {
    LocationLoader()
  }, 2000);
}, [searchAddressCoordinates])
//this is where my page router is stored as well all the state and functions are passed into each component
  const router = createBrowserRouter([{
    path: "/",
    element: <div>
      <ToolBar favoriteLocation={favoriteLocation} selectedLocation={selectedLocation} DeleteButton={DeleteButton} handleInput={handleInput} LocationList={LocationList}  SubmitButton={SubmitButton} handleChange={handleChange} ChangeSelLocation={ChangeSelLocation} />
      <Outlet />  
    </div>,
    hydrateFallbackElement: <h4>Loading...</h4>,
    children: [
      {
        path: "/",
        element: <MainTable setWeatherData={setWeatherData} weatherData={weatherData} LocationList={LocationList} selectedLocation={selectedLocation} />,

      },
      {
        path: "/AirQuality",
        element: <AirQuality LocationList={LocationList} selectedLocation={selectedLocation}></AirQuality>
      },
      {
        path: "/UsWeatherAlert",
        element: <UsWeatherAlert LocationList={LocationList} selectedLocation={selectedLocation}></UsWeatherAlert>
      }
    ]
  }])

  return (
    <RouterProvider router={router} />
  )
}