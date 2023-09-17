//Obtengo data con axios de monedas
const getDataAxios = async () =>{
    try {
        let dataAxiosURL = await axios("https://mindicador.cl/api");
        let dataAxios = await dataAxiosURL.data;
        return dataAxios;
    } catch (err) {
        console.error(err.message);
    }
    
};
//Obtengo data con axios de fechas y valor de moneda seleccionada
const getDataGraph = async () =>{
    let currencyValue = selectCurrency.value
    try {
        //Obtengo Recursos segun seleccion del cliente
        let dataAxiosURL = await axios(`https://mindicador.cl/api/${currencyValue}`);
        let fechaAxios = await dataAxiosURL.data.serie;
        //selecciono los datos que necesito para la data
        let resDate = fechaAxios.slice(1,11);

        //Retorno las fechas
        const labels = resDate.map((label) => {
            return label.fecha;
        });
        //retorno los valores
        const valueDate = resDate.map((label) => {
            return label.valor;
        });
             //Retorno las fechas y valores dentro de la datasets
            const datasets = [
                {
                label: `${currencyValue}`,
                borderColor: "rgb(0,150,0)",
                data: `${valueDate}`,
                }
            ];
            return { labels, datasets };
    } catch (err) {
        console.error(err.message);
    };
    
};
//Rederizo datos en HTML
const sendDateHTML = (data) =>{
    //Cada vez que se active evento boton se actualizan los datos
    let pesoValue = peso.value;
    let currencyValue = selectCurrency.value
    //Guardo el valor de la moneda seleccionada y realizo el calculo
    let currency = data[currencyValue].valor;
    let result = pesoValue / currency;
    let resultDecimal = result.toLocaleString("es-ES");
    console.log(resultDecimal);
    //Renderizo el resultado en DOM
    let html = `
                <p>El valor del <b style="background-color:#070;">${currencyValue}</b> es: ${currency}
                <h1>${resultDecimal} ${currencyValue}</h1>
                `
    divResult.innerHTML = html;
}
//Renderizo dato en HTML de Grafica
const renderGraphHtml = async() =>{
try {
    let html =`Variacion de la moneda`;
    title.innerHTML = html; 
    const data = await getDataGraph();
    const config = {
    type: "line",
    data
    };
    // Elimino lienzo si ya existe y creo uno nuevo
    if (Chart.getChart("myChart")) {
        Chart.getChart("myChart").destroy();
        }

    myChart.style.backgroundColor = "rgba(255, 255, 255, 0.197)";
    divGraph.style.width = "800px";
    divGraph.style.height = "500px";
    new Chart(myChart, config);
} catch (err) {
    console.error(err)
};
};


