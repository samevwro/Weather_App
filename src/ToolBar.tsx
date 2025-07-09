import { Button, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { type ChangeEvent } from "react";
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import { useRef } from "react";
import { LocationListRender } from "./LocationListRender";



const library = ["places"]
type ToolBarTypes = {
    ChangeSelLocation: (id: number) => void
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    SubmitButton: () => void
    DeleteButton: (id: number) => void
    LocationList: any
    handleInput: (value: any) => void
    selectedLocation: number
    favoriteLocation: (id: number) => void

}


export function ToolBar({ favoriteLocation, DeleteButton, selectedLocation, handleInput, LocationList, SubmitButton, ChangeSelLocation, handleChange }: ToolBarTypes) {
   //This is where the google auto complete search bar function is
   const inputref = useRef<any>(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_VERIFICATION_KEY,
        libraries: library
    })
    const handleOnPlacesChanged = (ref: any) => {
        let address = inputref.current!.getPlaces()
        handleInput(ref.target.value)
    }


    return (
        <Navbar className=" bg-secondary " >
            <Navbar.Text style={{ width: '100%' }} >
                <div className="d-flex justify-content-evenly">
                    <div className="d-flex align-items-start">
                        <NavLink style={{ margin: 8, color: "aliceblue" }} to="/" >Home</NavLink>
                        <NavLink style={{ margin: 8, color: "aliceblue" }} to="/AirQuality">Air Quality</NavLink>
                        <NavLink style={{ margin: 8, color: "aliceblue" }} to="/UsWeatherAlert">US Weather Alert</NavLink>
                    </div>
                    <form className="d-flex ">
                        <div>
                            <label id="LocationsLabel">Location
                                <select id="DropDownList" className="Locations" onChange={(e) => ChangeSelLocation(Number(e.target.value))}>
                                    <LocationListRender LocationList={LocationList}/>
                                </select>
                            </label>
                        </div>
                        <div className="d-flex d-column">
                            <Button id="locationDelete" className="Locations" onClick={(e) => { e.preventDefault(); DeleteButton(selectedLocation) }}>Delete Location</Button>
                            <Button id="locationStar" className="Locations" onClick={(e) => { e.preventDefault(); favoriteLocation(selectedLocation) }}>Favorite Location</Button>
                        </div>
                        <div>

                            {isLoaded &&
                                <StandaloneSearchBox onLoad={(ref) => inputref.current = ref} onPlacesChanged={() => handleOnPlacesChanged}>
                                    <input id="AddressInput" name="city" style={{ margin: 5 }} type="text" ref={ inputref} onBlur={handleOnPlacesChanged} placeholder="City Address" />
                                </StandaloneSearchBox>}
                        </div>
                        <div><input id="AddressInput" name="zip" style={{ margin: 5, width: "75px" }} onChange={handleChange} type="text" placeholder="Zip Code" /></div>
                        <div><button id="locationSubmit" className="Locations" onClick={(e) => { e.preventDefault(); SubmitButton() }}>Search</button></div>

                    </form>
                </div>

            </Navbar.Text>
        </Navbar>
    )
}
