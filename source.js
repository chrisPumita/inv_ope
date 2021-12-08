var DATA = {
    "nodes": [],
    "edges": []
};

window.onload = function () {
    cargaGrafico();
};

// add a new data row
function addNodo() {
    let objInput = $("#nombreNodo").val();
    if (objInput.length > 0) {
        let id = DATA.nodes.length;
        let nombre = objInput;
        var newValue = {
            id: id + 1,
            last_name: nombre,
            height: 30
        };
        DATA.nodes.push(newValue);
        console.log(DATA);
        cargaGrafico();
        updateListas();
    } else {
        alert("No debe estar vacio el el campo de nodo");
    }
}

function updateListas() {
    let template = '';
    DATA.nodes.forEach(
        obj => {
            template += `<option value="${obj.id}">${obj.last_name}</option>`;
        }
    );
    //Selecciono el elemento donde voy a pintar el template
    $('#SelectFrom').html(template);
    $('#SelectTo').html(template);
    $('#inicialNode').html(template);
    //finNode
}

function addArco() {
    let from = $('#SelectFrom').val();
    let to = $('#SelectTo').val();
    let distance = $("#distancia").val();
    let namefrom = $('#SelectFrom option:selected').text();
    let nameto = $('#SelectTo option:selected').text();

    var newValue = {
        count_id: DATA.edges.length +1,
        from: parseInt(from),
        to: parseInt(to),
        name_from: namefrom,
        name_to: nameto,
        distance: distance,
        normal: normalYes(false),
        hovered: hoverYes(false),
        selected: selectedYes(false)
    };
    DATA.edges.push(newValue);
    cargaGrafico();
}

function cargaGrafico() {
    // create a chart and set loaded data
    $("#container").html("");
    // create a chart and set loaded data
    var chart = anychart.graph(DATA);
    chart.title("Ruta mas corta");
    var zoomController = anychart.ui.zoom();
    zoomController.target(chart);
    zoomController.render();

    chart.nodes().labels().enabled(true);
    // configure tooltips of edges
    chart.edges().tooltip().format("{%distance} Km");
    chart.edges().arrows({
        enabled: true,
        size: 15,
        position: '100%'
    });
    var labels = chart.edges().labels();

    labels.enabled(true);
    labels.format('{%distance} Km');
    labels.fontSize(16);
    // configure labels of nodes
    chart.nodes().labels().format("{%last_name}");
    chart.nodes().labels().fontSize(16);
    chart.nodes().labels().fontWeight(600);
    chart.rotation(90);
    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw();
    //Build Tables
    loadEnlaces(DATA.edges);
    listaTblNodos(DATA.nodes);
}

function cargaGraficoFinal(data) {
    // create a chart and set loaded data
    $("#containerResult").html("");
    // create a chart and set loaded data
    var chart = anychart.graph(data);
    chart.title("Ruta mas corta");
    var zoomController = anychart.ui.zoom();
    zoomController.target(chart);
    zoomController.render();

    chart.nodes().labels().enabled(true);
    // configure tooltips of edges
    chart.edges().tooltip().format("{%distance} Km");
    chart.edges().arrows({
        enabled: true,
        size: 15,
        position: '100%'
    });
    var labels = chart.edges().labels();

    labels.enabled(true);
    labels.format('{%distance} Km');
    labels.fontSize(16);
    // configure labels of nodes
    chart.nodes().labels().format("{%last_name}");
    chart.nodes().labels().fontSize(16);
    chart.nodes().labels().fontWeight(600);
    chart.rotation(90);
    // set the container id
    chart.container("containerResult");

    // initiate drawing the chart
    chart.draw();
    //Build Tables
    loadEnlaces(DATA.edges);
    listaTblNodos(DATA.nodes);
}

function normalYes(params) {
    return params ? {
        stroke: {
            color: "#ffa000",
            thickness: "2",
            dash: "10 5",
            lineJoin: "round"
        }
    } : null;
}

function hoverYes(params) {
    return params ? {
        stroke: {
            color: "#ffa000",
            thickness: "4",
            dash: "10 5",
            lineJoin: "round"
        }
    } : null;
}

function selectedYes(params) {
    return params ? {
        stroke: "4 #ffa000"
    } : null;
}


////////////// CREADORES HTML ///////////////
function loadEnlaces(ENLACES) {
    let template = `<table class="table">
                <thead>
                  <tr>
                  <th scope="col"></th>
                    <th scope="col">DE</th>
                    <th scope="col">A</th>
                    <th scope="col">DISTANCIA</th>
                  </tr>
                </thead>
                <tbody>`;
    if (ENLACES.length > 0) {
        ENLACES.forEach(
            (arco) => {
                template += `<tr>
        <td><i class="fa fa-share-alt text-success" aria-hidden="true"></i></td>
        <td>${arco.name_from}</td>
        <td>${arco.name_to}</td>
        <td>${arco.distance} Km.</td>
      </tr>`;
            }
        );
        template += `</tbody>
</table>`;
    } else {
        template = `
  <div class="alert alert-warning d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
    <div>
      Aun no se han unido Nodos, cree los arcos de nodos para mostrarlas aqui
    </div>
  </div>
  `;
    }
    $("#tblArcos").html(template);
}

function listaTblNodos(NODOS) {
    let template = `<table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">ID</th>
                    <th scope="col">Nodo</th>
                  </tr>
                </thead>
                <tbody>`;
    let i = 0;
    if (NODOS.length > 0) {
        NODOS.forEach(
            (nodo) => {
                template += `<tr>
        <th scope="row"><i class="fa fa-circle text-info" aria-hidden="true"></i></th>
        <td>${nodo.id}</td>
        <td>${nodo.last_name}</td>
      </tr>`;
            }
        );
        template += `</tbody>
          </table>`;
    } else {
        template = `
  <div class="alert alert-warning d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
    <div>
      Aun no tenemos datos para procesar. Por favor ingrese Nodos y posteriormente arcos 
    </div>
  </div>
  `;

    }
    $("#tblNodos").html(template);
}

/*PROICESAMIENTO DE LOS NODOS*/



function printResults(C, C0, it) {
    console.log(C);
    console.log(C0);
    let template = $("#textAreaInfo").val();

    template += `\nC${it}={`;
    if (C.length > 0) {
        C.forEach(
            (nodo) => {
                template += `${nodo.last_name},`;
            }
        );
    } else {
        template += "0";
    }
    template += `} y C0={`;
    if (C0.length > 0) {
        C0.forEach(
            (nodo) => {
                template += `${nodo.last_name},`;
            }
        );
    } else {
        template += "0";
    }
    template += "}";
    $("#textAreaInfo").val(template);
}
