function myFunction() {
  var stockName = document.getElementById("sname").value;
  document.getElementById("sname").value = "";
  if (stockName !== "") {
    var x = document.createElement("LI");
    var t = document.createTextNode(stockName);
    x.appendChild(t);
    document.getElementById("myList").appendChild(x);
    getChartData(stockName);
  }
}
