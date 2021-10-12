import {request} from "./request"
export function getInvestigation(workCode,taskCode) {
    return request({
      url: "/GetInvestigation",
      params: {
        workCode,taskCode
      }
    })
  }