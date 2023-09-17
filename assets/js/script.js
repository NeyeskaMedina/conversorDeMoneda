let peso = document.getElementById('peso');
let selectCurrency = document.getElementById('select');
let divResult = document.getElementById('result');
let btnConvert = document.getElementById('btnConvert');
let title = document.getElementById('title');
let myChart = document.getElementById("myChart");
let divGraph = document.getElementById('graph');
//Escucho evento boton para convertir moneda
btnConvert.addEventListener('click', async()=> {
    let data = await getDataAxios();
    sendDateHTML(data);
    renderGraphHtml();
});

