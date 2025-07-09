  type AlertDataType ={
    WeatherAlertData: any[]
    selLocation: number
  }
  
  
  
  //this function creates the elements and populates them with the different information
    //from the api and checks if its loaded before displaying
    export function AlertData({WeatherAlertData, selLocation}: AlertDataType) {
        if(WeatherAlertData.length != 0){
             return (
            <div>
                <h5 style={{margin: "10px"}}>{WeatherAlertData[selLocation].headline}</h5>
                <h5 style={{margin: "10px"}}>Urgency: {WeatherAlertData[selLocation].urgency}</h5>
                <div className="InfoBorder" style={{margin: "6px"}}><p style={{margin: "10px"}} >{WeatherAlertData[selLocation].alertDescription}</p></div>
                
                <p style={{margin: "10px"}}><b>Safety Instructions:  </b>{WeatherAlertData[selLocation].safetyInstructions != null? WeatherAlertData[selLocation].safetyInstructions: "Warning No Longer Issued"}</p>
            </div>
        )}else{return <h3>Loading...</h3>}
       
    }