import {request} from "./request"
export function getAcceptInfo(eventCode) {
    return request({
      url: "/GetAcceptInfo",
      params: {
        eventCode
      }
    })
  }