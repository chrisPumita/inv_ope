var NODOS_ARCOS_PROCESADOS = {
    "nodes": [],
    "edges": []
};

function procesar() {
    let tmpData = DATA;
    $("#textAreaInfo").val("");
    NODOS_ARCOS_PROCESADOS.nodes = tmpData.nodes;
    /*****PASO 1 EL NODO INICAL SE COLOCA DENTRO DEL MODEL*******/
    if (tmpData.edges.length > 0) {
        let idNodoInicial = parseInt($("#inicialNode").val()); //obteniendo el id del nodo principal
        let NodoInicial = tmpData.nodes.find(x => x.id === idNodoInicial);
        console.log(NodoInicial);
        var newValue = {
            count_id: 1,
            from: null,
            to: NodoInicial.id,
            name_from: null,
            name_to: NodoInicial.last_name,
            distance: 0,
            valor_forme_padre: 0,
            valor_tmp: 0,
            valor_firme: 0,
            es_ruta: true, //el primer nodo es ruta por default, pero no mascamos sus arcos
            normal: normalYes(false),
            hovered: hoverYes(false),
            selected: selectedYes(false)
        };
        NODOS_ARCOS_PROCESADOS.edges.push(newValue);
        let conteo = 1;
        console.log("\n\n\n\n\n\n\n\n_________________________________");
        /*****PASO 2 Comenzamos a analizar los siguientes nodos y enlaces*******/
        while (tmpData.edges.length >= 1) {
            console.log("---------- RECORDDIO A TABLA DE NODOS_________");
            //abrimos para comenzar a analizar cada nodo y aunque se pasen algunos,
            //estos quedaran al final para volver a ser analizados
            tmpData.edges.forEach(
                (enlace) => {
                    console.log("\n>>>>.... ITERACION DE NODOS " + conteo + ".....");
                    //revisar si el id hijo no es padre dentro del mismo array
                    let nodosHijos = tmpData.edges.find(x => x.to === enlace.from);
                    let esHijo = nodosHijos != null ? true : false;
                    let esRuta = false;
                    //No es hijo, entonces lo sacamos del tmp y lo mandamos al procesado
                    if (!esHijo) {
                        conteo++;
                        let tmpArco = tmpData.edges.find(x => x.count_id === enlace.count_id);
                        //lo quitamos de los datos temporales
                        let indexNodo = tmpData.edges.findIndex(x => x.count_id === tmpArco.count_id);
                        tmpData.edges.splice(indexNodo, 1)
                        //#VARIABLES INICIALIZADAS
                        let valorFirmePadre = NODOS_ARCOS_PROCESADOS.edges.find(x => x.to === enlace.from).valor_firme;
                        let valorTmp = parseInt(valorFirmePadre) + parseInt(enlace.distance);
                        let valorFirme = parseInt(valorTmp);
                        //# VALOR TEMPORAL
                        //buscamos si hay otros padres ya definidos
                        let objPadres = NODOS_ARCOS_PROCESADOS.edges.filter(x => x.from === tmpArco.from);

                        //creamos el nodo que añadiremos
                        var addNodeEnlace = {
                            count_id: conteo,
                            from: enlace.from,
                            to: enlace.to,
                            name_from: enlace.name_from,
                            name_to: enlace.name_to,
                            distance: enlace.distance,
                            valor_firme_padre: valorFirmePadre,
                            valor_tmp: valorTmp,
                            valor_firme: valorFirme,
                            es_ruta: true,
                            normal: normalYes(false),
                            hovered: hoverYes(false),
                            selected: selectedYes(false)
                        };

                        if (objPadres.length > 0) {
                            //padre/padres encontrados, recorremos a los padres para verificar el valor mas  pequeño
                            objPadres.forEach(
                                padre => {
                                    //Comparamos con el obj_enlace que se esta analizando
                                    if (padre.valor_tmp > addNodeEnlace.valor_tmp) {
                                        //cuando el enlase analizado es mayor dejamos el enlace como ruta
                                        esRuta = true;
                                        //removemos el las popiedades de  la ruta anterior
                                        //Se le quita tita true a este padre porque es mayor
                                        //opbtener el index de este nodo que vamos a actualizar
                                        let idIndexNodo = NODOS_ARCOS_PROCESADOS.edges.findIndex(x => x.count_id === padre.count_id);
                                        NODOS_ARCOS_PROCESADOS.edges[idIndexNodo].normal = null;
                                        NODOS_ARCOS_PROCESADOS.edges[idIndexNodo].hovered = null;
                                        NODOS_ARCOS_PROCESADOS.edges[idIndexNodo].selected = null;
                                        NODOS_ARCOS_PROCESADOS.edges[idIndexNodo].es_ruta = false;

                                        //confirmo que el nuevo nodo es ruta
                                        addNodeEnlace.normal = normalYes(true);
                                        addNodeEnlace.hover = hoverYes(true);
                                        addNodeEnlace.selected = selectedYes(true);

                                    } else {
                                        console.log("El nuevo nodo NO ES MENOR al padre, no se hará ruta");
                                        addNodeEnlace.esRuta = false;
                                    }
                                }
                            );
                            //////////////////////////////////////////
                        } else {

                            //revisar su antecedor si es ruta, si es ruta lo marcamos igual
                            let JEFES = NODOS_ARCOS_PROCESADOS.edges.find(x => x.from === addNodeEnlace.from);
                            if (JEFES != null) {
                                if (JEFES.es_ruta) {
                                    addNodeEnlace.normal = normalYes(true);
                                    addNodeEnlace.hover = hoverYes(true);
                                    addNodeEnlace.selected = selectedYes(true);
                                    //lo colocamos en el los nodos procesados y calculamos su valores
                                    addNodeEnlace.es_ruta = true;
                                } else {
                                    addNodeEnlace.normal = normalYes(false);
                                    addNodeEnlace.hover = hoverYes(false);
                                    addNodeEnlace.selected = selectedYes(false);
                                    addNodeEnlace.es_ruta = false;
                                }
                            } else {
                                addNodeEnlace.normal = normalYes(true);
                                addNodeEnlace.hover = hoverYes(true);
                                addNodeEnlace.selected = selectedYes(true);
                                //lo colocamos en el los nodos procesados y calculamos su valores
                                addNodeEnlace.es_ruta = true;
                            }
                        }
                        //Lo aladimos a los procedados
                        NODOS_ARCOS_PROCESADOS.edges.push(addNodeEnlace);
                    } else {
                        console.log(enlace.to + " NO SE PROCESA");
                        //como si es hijo, entonces revisamos al sigueinte enlace
                    }
                    //        cargaGraficoFinal(tmpData);
                    console.log("\n\n\n\n\n\n\n\n_________________________________");
                });
        }
    } else {
        alert("No hay datos que procesar");
    }
    //Concluimos procesaondo
    let mostrarMjeRuta = "";
    NODOS_ARCOS_PROCESADOS.edges.forEach((nodo) => {
        mostrarMjeRuta += nodo.es_ruta ? nodo.name_from + "-" + nodo.name_to + " es ruta con " + nodo.distance + " km \n" : "";
    });
    $("#textAreaInfo").val(mostrarMjeRuta);
    console.log("****************************")
    console.log(NODOS_ARCOS_PROCESADOS);
    cargaGraficoFinal(NODOS_ARCOS_PROCESADOS);
}

function saveFile() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(NODOS_ARCOS_PROCESADOS, null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "data.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  function loadFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      let lines = e.target.result;
      var newArr = JSON.parse(lines); 
      console.log(newArr);
      cargaGrafico(newArr);
      DATA=newArr;
      updateListas();
    }
  }