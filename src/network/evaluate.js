import {
    request
  } from "./request"
  export function getEvaluate (workCode, taskCode, evaluate , remarks) {
    return request({
      url: "/GetEvaluate",
      params: {
        workCode,
        taskCode,
        evaluate,
        remarks
      }
    })
  }