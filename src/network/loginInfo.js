import {request} from "./request"
export function getLogin(userName,password) {
    return request({
      url: "/GetLogin",
      params: {
        userName,password
      }
    })
  }