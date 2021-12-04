var DATA = {
  nodes: [
      {id: "A",last_name: "A",height: 30},
      {id: "B",last_name: "B",height: 30},
      {id: "C",last_name: "C",height: 30},
      {id: "D",last_name: "D",height: 30},
      {id: "E",last_name: "E",height: 30},
      {id: "F",last_name: "F",height: 30},
      {id: "G",last_name: "G",height: 30},
      {id: "Z",last_name: "Z",height: 30},
  ],
  edges: [
      {from: "A",   to: "B", distance:16,normal: normalYes(true),hovered:hoverYes(true),selected:selectedYes(true)},
      {from: "A",   to: "C", distance:6,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "A",   to: "D", distance:5,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "B",   to: "G", distance:6,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "B",   to: "F", distance:4,normal: normalYes(true),hovered:hoverYes(true),selected:selectedYes(true)},
      {from: "B",   to: "C", distance:2,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "C",   to: "F", distance:12,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "C",   to: "E", distance:10,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "C",   to: "D", distance:4,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "D",   to: "E", distance:15,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "E",   to: "F", distance:3,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "E",   to: "Z", distance:5,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "F",   to: "G", distance:8,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)},
      {from: "F",   to: "Z", distance:16,normal: normalYes(true),hovered:hoverYes(true),selected:selectedYes(true)},
      {from: "G",   to: "Z", distance:7,normal: normalYes(false),hovered:hoverYes(false),selected:selectedYes(false)}
  ]
  };

  $(document).ready(function() {
    listaTblNodos(DATA.nodes);
    loadEnlaces(DATA.edges);
  });


anychart.onDocumentReady(function () {
    // create DATA
    // create a chart and set the DATA
    var chart = anychart.graph(DATA);
    //
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

// function, if listener triggers
function addPoint() {
  // first index for new point
  newIndex = 22;
  // append DATA
  this.DATA.push({id: newIndex,last_name: "XXXX",height: 30});
  listaTblNodos(DATA.nodes);
  loadEnlaces(DATA.edges);
};

////////////// CREADORES HTML ///////////////

function loadEnlaces(arcos) {
  let template = "";
  let i =0;
  arcos.forEach(
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

function listaTblNodos(nodos) {
  let template = "";
  let i = 0;
  nodos.forEach(
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
  console.log(nodos);
}
