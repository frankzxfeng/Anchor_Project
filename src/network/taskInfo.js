import {request} from "./request"
export function getTaskInfo(eventCode) {
    return request({
      url: "/GetTaskInfo",
      params: {
        eventCode
      }
    })
  }