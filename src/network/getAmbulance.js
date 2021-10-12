import {request} from "./request"
export function getAmbulance(stationCode) {
    return request({
      url: "/GetAmbulance",
      params: {
        stationCode
      }
    })
  }


  export function getAllAmbulance(nunber) {
    return request({
      url: "/GetAmbulanceNew",
      params: {
        nunber
      }
    })
  }