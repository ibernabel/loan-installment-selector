window.onload = function () {

  // Scripts de los Sliders
  const slider1 = document.querySelector('#slider-round-1');
  const slider2 = document.querySelector('#slider-round-2');

  const inputMonto = document.querySelector('#inputMonto');
  const inputPlazo = document.querySelector('#inputPlazo');
  const inputCuota = document.querySelector('#inputCuota');
  const pagoFrecuencia = document.querySelector('#pagoFrecuencia');
  const pagoCuota = document.querySelector('#pagoCuota');
  const checkMensual = document.querySelector('#formCheckMensual');
  const checkQuincenal = document.querySelector('#formCheckQuincenal');
  const labelPlazoStart = document.querySelector('#labelPlazoStart');
  const labelPlazoEnd = document.querySelector('#labelPlazoEnd');
  const gastosDeCierre = 500;
  const tasaMensual = 0.06;
  const tasaQuincenal = 0.03;

  const currency = function (number) { return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 2 }).format(number) }; // Funcion que sirve para dar formato de moneda local

  let prestamo;
  let interes;
  let monto;
  let plazo;
  let tasa;
  let frecuencia;
  let frecuenciaLiteral;
  let capitalCuota;
  let montoCuota;

  // Slider 1
  noUiSlider.create(slider1, {
    start: [10000],
    range: {
      'min': 1000,
      'max': 15000
    },
    step: 1000,
    padding: [2000, 0],
    connect: 'lower',
    tooltips: wNumb({
      mark: '.',
      thousand: ',',
      decimals: 2,
      prefix: 'RD$'
    })
  });

  // Slider 2
  noUiSlider.create(slider2, {
    range: {
      'min': 4,
      'max': 24
    },
    start: [14],
    step: 1,
    connect: 'lower',
    tooltips: wNumb({
      decimals: 0,
      suffix: ' Quincenas',
    })
  });

  slider1.noUiSlider.on('change.one', calcularCuota);
  slider2.noUiSlider.on('change.one', calcularCuota);
  checkMensual.addEventListener('change', calcularCuota);
  checkQuincenal.addEventListener('change', calcularCuota);

  function calcularCuota() {
    valuePlazo = slider2.noUiSlider.get();
    valuePlazo = Math.round(valuePlazo).toString();

    monto = parseInt(slider1.noUiSlider.get());
    // console.log(monto);   
    plazo = parseInt(slider2.noUiSlider.get());
    // console.log(plazo);  
    prestamo = monto + gastosDeCierre;
    // console.log(prestamo);
    tasa = (checkMensual.checked ? tasaMensual : tasaQuincenal);
    frecuencia = (checkMensual.checked ? "Mensual" : "Quincenal");

    //plural = ( valuePlazo == 1 ) ?  "" : "";

    startSelected = (this.value == "Mensual" || this.value == "Quincenal") ? ((checkMensual.checked) ? 8 : 14) : valuePlazo;
    cantidadCuotasMinimas = "4 ";
    cantidadCuotasMaximas = (checkMensual.checked) ? 12 : 24;
    frecuenciaLiteral = (checkMensual.checked) ? " Meses" : " Quincenas";
    //frecuenciaLiteral = (checkMensual.checked) ? ( valuePlazo == 1 ) ?  " Mes" : " Meses" : ( valuePlazo == 1 ) ? " Quincena" : " Quincenas";

    // console.log(tasa);   
    capitalCuota = prestamo / plazo;
    // console.log(capitalCuota);   
    interes = prestamo * tasa;
    // console.log(interes);   
    montoCuota = capitalCuota + interes;
    montoCuota = montoCuota.toFixed(2);
    // console.log(montoCuota);   
    labelPlazoStart.innerHTML = cantidadCuotasMinimas + frecuenciaLiteral;
    labelPlazoEnd.innerHTML = cantidadCuotasMaximas.toString() + frecuenciaLiteral;
    pagoFrecuencia.innerHTML = "Cuota " + frecuencia;
    pagoCuota.innerHTML = currency(montoCuota);
    //frecuenciaParaPagar.innerHTML = frecuenciaLiteral + " para pagar";
    //plazoParaPagar.innerHTML = plazo + " " + frecuenciaLiteral;

    slider2.noUiSlider.updateOptions({
      range: {
        'min': 4,
        'max': cantidadCuotasMaximas
      },
      start: [startSelected],
      tooltips: wNumb({ decimals: 0, suffix: frecuenciaLiteral })
    });
    inputMonto.setAttribute("value", monto);
    inputPlazo.setAttribute("value", valuePlazo);
    inputCuota.setAttribute("value", montoCuota);
  }

  const myForm = document.querySelector('#myForm');
  myForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputMonto = this.inputMonto.value;
    const inputPlazo = this.inputPlazo.value;
    const inputCuota = this.inputCuota.value;
    const frecuencia = this.frecuenciaPago.value;
    const url = `https://pro.solufime.com/?precalculado="si"&frecuencia=${frecuencia}&monto=${inputMonto}&plazo=${inputPlazo}&cuota=${inputCuota}`

    //this.action = url;
    //this.submit();
    window.location.href = url;
  });

}
