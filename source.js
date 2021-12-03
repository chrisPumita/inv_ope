anychart.onDocumentReady(function () {

    // create data
    // create data
    var data = {
    nodes: [
        {id: "Richard"},
        {id: "Larry"},
        {id: "Marta"},
        {id: "Jane"},
        {id: "Norma"},
        {id: "Frank"},
        {id: "Brett"},
        {id: "Tommy"}
    ],
    edges: [
        {from: "Richard", to: "Larry"},
        {from: "Richard", to: "Marta"},
        {from: "Larry",   to: "Marta"},
        {from: "Marta",   to: "Jane",
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
        {from: "Jane",    to: "Norma"},
        {from: "Jane",    to: "Frank"},
        {from: "Jane",    to: "Brett"},
        {from: "Brett",   to: "Frank"}
    ]
    };

    // create a chart and set the data
    var chart = anychart.graph(data);

    var zoomController = anychart.ui.zoom();
    zoomController.target(chart);
    zoomController.render();
    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw();
  });