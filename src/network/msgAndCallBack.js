import {request} from "./request"
export function getMsgAndCallBack(startTime, endTime, taskCode, stationCode, ambulanceCode, nurseName, doctorName, driverName, patientName, state, address, phone) {
  return request({
    url: "/GetDXHF",
    params: {
      startTime,
      endTime,
      taskCode,
      stationCode,
      ambulanceCode,
      nurseName,
      doctorName,
      driverName,
      patientName,
      state,
      address,
      phone
    }
  })
}

//http://172.16.100.132:8012/api/LargeData/GetDXHF?startTime=2021-08-18 00:00:00&endTime=2021-09-01 00:00:00&taskCode=&stationCode=&ambulanceCode=&nurseName=&doctorName=&driverName=&patientName=&state=&address=&phone=
//http://172.16.100.132:8012/api/LargeData/GetStationName
//http://172.16.100.132:8012/api/LargeData/GetAcceptInfo?eventCode=20210509185634m50101
//http://172.16.100.132:8012/api/LargeData/GetTaskInfo?eventCode=20210509185634m50101