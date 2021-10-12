import {request} from "./request"
export function sendSMS(eventCode,taskCode,phone) {
    return request({
      url: "/GetSendSMS",
      params: {
        eventCode,
        taskCode,
        phone
      }
    })
  }