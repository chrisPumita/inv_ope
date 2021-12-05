  $(document).ready(function() {

  });

  window.onload = function() {

  };

// add a new data row
function addNodo() {
    let id = JSON_DATA.nodes.length;
    var newValue = {id: "H",last_name: "H",height: 30};
    JSON_DATA.nodes.push(newValue);
    addArco();
  }

  function addArco() {
    var newValue = {from: "G",   to: "H", distance:16,normal: normalYes(true),hovered:hoverYes(true),selected:selectedYes(true)};
    JSON_DATA.edges.push(newValue);
  }


  anychart.onDocumentReady(function () {
    // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
    // https://cdn.anychart.com/releases/8.11.0/js/anychart-data-adapter.min.js

    // Load JSON data and create a chart by JSON data.
    anychart.data.loadJsonFile("data.json", function (data) {
// create a chart and set loaded data
        console.log(data);
                // create a chart and set loaded data
        var chart = anychart.graph(data);
        var zoomController = anychart.ui.zoom();
        zoomController.target(chart);
        zoomController.render();

        chart.nodes().labels().enabled(true);
    // configure tooltips of edges
        chart.edges().tooltip().format("{%distance} Km");
        // configure labels of nodes
        chart.nodes().labels().format("{%id}");
        chart.nodes().labels().fontSize(12);
        chart.nodes().labels().fontWeight(600);
        // set the container id
        chart.container("container");

        // initiate drawing the chart
        chart.draw();
    });
});

/*
    var myVar = setInterval(
        // data streaming itself
        function() {
            listaTblNodos(JSON_DATA.nodes);
            loadEnlaces(JSON_DATA.edges);
            chart.data(this.JSON_DATA);
            console.log(JSON_DATA);
            console.log("-\n");
        }, 1000            // interval
      );

*/

  

  function normalYes(params) {
    return params ? {stroke:  
      {
        color: "#ffa000",
        thickness: "2",
        dash: "10 5",
        lineJoin: "round"
      }}:null;
  }

  function hoverYes(params) {
    return params ? { stroke: 
      {
        color: "#ffa000",
        thickness: "4",
        dash: "10 5",
        lineJoin: "round"
      }}:null;
  }

  function selectedYes(params) {
    return params ? {stroke: "4 #ffa000"}: null;
  }


  ////////////// CREADORES HTML ///////////////
function loadEnlaces(ENLACES) {
  let template = "";
  let i =0;
  ENLACES.forEach(
    (arco)=>
    {
      i++;
        template += `<tr>
        <th scope="row">${i}</th>
        <td>${arco.from}</td>
        <td>${arco.to}</td>
        <td>${arco.distance} Km.</td>
      </tr>`;
    }
);
$("#tblArcos").html(template);
}

function listaTblNodos(NODOS) {
  let template = "";
  let i = 0;
  NODOS.forEach(
      (nodo)=>
      {
        i++;
          template += `<tr>
          <th scope="row">${i}</th>
          <td>${nodo.id}</td>
          <td>${nodo.last_name}</td>
        </tr>`;
      }
  );
  $("#tblNodos").html(template);
}
