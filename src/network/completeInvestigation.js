import {
  request
} from "./request"
export function getCompleteInvestigation(workCode, taskCode, reason, remarks) {
  return request({
    url: "/GetCompleteInvestigation",
    params: {
      workCode,
      taskCode,
      reason,
      remarks
    }
  })
}
