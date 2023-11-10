// const formattedCountries = countries.map((country) => ({
//   value: country.cca2,
//   label: country.name.common,
//   flag: country.flag,
//   latlng: country.latlng,
//   region: country.region,
// }));

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import L from 'leaflet'

const parseLocation = (locationString: string) => {
  let locationNames = {
    country: '',
    state: '',
    state_district: '',
    city: '',
    city2: '',
    // city3: '',
    road: '',
    house_number: '',
  }

  const locationList = locationString.split(', ').reverse()
  locationList.splice(1,1)

  const displayName = locationList.join(', ')

  locationNames.country = locationList[0]
  locationNames.state = locationList[1]
  locationNames.state_district = locationList[2]
  locationNames.city = locationList[3]

  locationNames.road = locationList[locationList.length-2]
  locationNames.house_number = locationList[locationList.length-1]


  if(locationList.length === 7)
    locationNames.city2 = locationList[4]
    

  return {
    locationNames,
    displayName 
  }

  // return Object.keys(locationNames).reduce((store, name, i) => {
  //   return {
  //     ...store,
  //     [name] : locationList[i]
  //   }
  // }, {})
 
}

const getByLatLng = async(latlng: number[]) => {
  if(latlng.length === 0) return
  const coords = {
    lat: latlng[0],
    lng: latlng[1],
  }
  let { data } = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json&accept-language=en-US`)
   
  data = parseLocation(data.display_name)

  return {
    locationNames: data.locationNames,
    display_name: data.displayName
  }
}


const useLocation = (location: number[]) => {
  const [locationDesc, setLocationDesc] = useState({
    country: '',
    state: '',
    state_district: '',
    city: '',
    city2: '',
    city3: '',
    road: '',
    house_number: '',
  })

  const [displayName, setDisplayName] = useState('')

  const getLocationDesc = useCallback(async(location: any) => {
    const res = await getByLatLng(location)
    setLocationDesc(res?.locationNames)
    setDisplayName(res?.display_name)
    
  }, [])

  // const locationString = useMemo(() => {
  //   if(locationDesc.country === '') return ''

  //   return `${locationDesc.country}, ${locationDesc.state}, ` 


  // },[locationDesc])

  useEffect(() => {
    if(location.length === 0) return
    getLocationDesc(location)
  }, [location])

  return {
    locationDesc,
    displayName
  }
};

export default useLocation;