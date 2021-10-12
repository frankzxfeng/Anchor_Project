import {request} from "./request"
export function getStationName() {
    return request({
      url: "/GetStationName",
    })
  }