export function getDateTime(){
    var now = new Date();
    var startDt = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    )
      .toISOString()
      .slice(0, 10);
    var endDt = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    )
      .toISOString()
      .slice(0, 10);
      var start = startDt;
      var end = endDt;
      var arr=[];
      arr.push(start);
      arr.push(end);
      return arr
}