var brandList = [];

var margin = { top: 20, right: 20, bottom: 100, left: 60 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom,
  x = d3.scale.ordinal().rangeRoundBands([0, width], 0.5),
  y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg
  .axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .innerTickSize(-width)
  .outerTickSize(0)
  .tickPadding(10);

function createSVG() {
  d3.select("#chartData").select("svg").remove();

  return d3
    .select("#chartData")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function getChartData(name) {
  var svg = createSVG();
  d3.json(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${name}&token=brk66v7rh5r9g3otjf20`,
    function (data) {
      brandList.push(data);

      x.domain(
        brandList.map(function (d) {
          return d.name;
        })
      );

      y.domain([
        0,
        d3.max(brandList, function (d) {
          return d.shareOutstanding;
        }),
      ]);

      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("dx", "-0.5em")
        .attr("dy", "-.55em")
        .attr("y", 30)
        .attr("transform", "rotate(0)");

      svg
        .append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", "0.8em")
        .attr("text-anchor", "end")
        .text("Word Count");

      svg
        .selectAll("bar")
        .data(brandList)
        .enter()
        .append("rect")
        .style("fill", "orange")
        .attr("x", function (d) {
          return x(d.name);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
          return y(d.shareOutstanding);
        })
        .attr("height", function (d) {
          return height - y(d.shareOutstanding);
        });
    }
  );
}
