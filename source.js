anychart.onDocumentReady(function () {
    // create data
    var data = {
    nodes: [
        {id: "A",last_name: "A"},
        {id: "B",last_name: "B"},
        {id: "C",last_name: "C"},
        {id: "D",last_name: "D"},
        {id: "E",last_name: "E"},
        {id: "F",last_name: "F"},
        {id: "G",last_name: "G"},
        {id: "H",last_name: "H"}
    ],
    edges: [
        {from: "A", to: "B", distance:5},
        {from: "A", to: "C", distance:5},
        {from: "C",   to: "D", distance:5},
        {from: "B",   to: "E", distance:5,
        normal: {stroke:  {
                            color: "#ffa000",
                            thickness: "2",
                            dash: "10 5",
                            lineJoin: "round"
                        }
        },
        hovered: {stroke: {
                            color: "#ffa000",
                            thickness: "4",
                            dash: "10 5",
                            lineJoin: "round"
                        }
        },
        selected: {stroke: "4 #ffa000"}
        },
        {from: "B",    to: "F", distance:5},
        {from: "C",    to: "G", distance:5},
        {from: "G",    to: "B", distance:5},
        {from: "G",   to: "H", distance:5}
    ]
    };

    // create a chart and set the data
    var chart = anychart.graph(data);
    loadDataTable(data);
  
    var zoomController = anychart.ui.zoom();
    zoomController.target(chart);
    zoomController.render();

    chart.nodes().labels().enabled(true);

// configure labels of nodes
chart.nodes().labels().format("{%id}");
chart.nodes().labels().fontSize(12);
chart.nodes().labels().fontWeight(600);
    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw();
  });

  function loadDataTable(data) {
    let nodos = data.nodes;
    let arcos = data.edges;
    let template = "";
    for (let i = 0; i < nodos.length; i++) {
        template += `<tr>
        <th scope="row">${i}</th>
        <td>${nodos[i].id}</td>
        <td>${arcos[i].from}</td>
        <td>${arcos[i].to}</td>
        <td>${arcos[i].distance} cm</td>
      </tr>`;
    }
    $("#tblNodos").html(template);
  }