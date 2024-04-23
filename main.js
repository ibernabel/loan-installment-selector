        window.onload = function() {

            // Scripts de los Sliders
            const slider1 = document.getElementById('slider-round-1');
            const slider2 = document.getElementById('slider-round-2');

            // const calculoResultado = document.getElementById('calculoResultado');
            const frecuenciaParaPagar = document.getElementById('frecuenciaParaPagar');
            const plazoParaPagar = document.getElementById('plazoParaPagar');
            const pagoFrecuencia = document.getElementById('pagoFrecuencia');
            const pagoCuota = document.getElementById('pagoCuota');
            const checkMensual = document.getElementById('formCheckMensual');
            const checkQuincenal = document.getElementById('formCheckQuincenal');
            const gastosDeCierre = 500;
            const tasaMensual = 0.06;
            const tasaQuincenal = 0.03;

            const currency = function(number){return new Intl.NumberFormat('es-DO', {style: 'currency',currency: 'DOP', minimumFractionDigits: 2}).format(number)}; // Funcion que sirve para dar formato de moneda local

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
                    'min': 1,
                    'max': 12
                },
                start: [12],
                step: 1,
                connect: 'lower',
                tooltips: wNumb({
                    decimals: 0,
                    suffix: ' Quincenas',
                })
            });
         
            // Escuchar el evento 'change' para ver si el valor del slider2 es igual a 1 para cambiar el sufijo de plurar a singular y viceversa
            // slider2.noUiSlider.on('change.one', actualizarTooltip);
            
            // function actualizarTooltip () {
            //    value = slider2.noUiSlider.get();
            //    if ( value == 1 ){ slider2.noUiSlider.updateOptions({
            //             tooltips: wNumb({decimals: 0, suffix: ' Mes'})
            //             });
            //     } else {
            //         slider2.noUiSlider.updateOptions({
            //             tooltips: wNumb({decimals: 0, suffix: ' Meses'})
            //         });
            //     }
            // }  

            slider1.noUiSlider.on('change.one', calcularCuota);
            slider2.noUiSlider.on('change.one', calcularCuota);
            checkMensual.addEventListener('change', calcularCuota);
            checkQuincenal.addEventListener('change', calcularCuota);
            
            function calcularCuota() {
                valuePlazo = slider2.noUiSlider.get();

                monto = parseInt( slider1.noUiSlider.get());
                    // console.log(monto);   
                plazo = parseInt( slider2.noUiSlider.get());
                    // console.log(plazo);  
                prestamo =  monto + gastosDeCierre;
                    // console.log(prestamo);
                tasa = ( checkMensual.checked ? tasaMensual : tasaQuincenal); 
                frecuencia = (checkMensual.checked ? "Mensual" : "Quincenal");

                plural = ( valuePlazo == 1 ) ?  "" : "";

                // frecuenciaLiteral = (checkMensual.checked) ? "Meses" : "Quincenas";
                frecuenciaLiteral = (checkMensual.checked) ? ( valuePlazo == 1 ) ?  " Mes" : " Meses" : ( valuePlazo == 1 ) ? " Quincena" : " Quincenas";

                        // console.log(tasa);   
                capitalCuota = prestamo / plazo;
                    // console.log(capitalCuota);   
                interes = prestamo * tasa;
                    // console.log(interes);   
                montoCuota = capitalCuota + interes;
                montoCuota = montoCuota.toFixed(2);
                    // console.log(montoCuota);   

                pagoFrecuencia.innerHTML = "Pago " + frecuencia;
                pagoCuota.innerHTML = currency(montoCuota);
                frecuenciaParaPagar.innerHTML = frecuenciaLiteral + " para pagar";
                plazoParaPagar.innerHTML = plazo + " " + frecuenciaLiteral;

                slider2.noUiSlider.updateOptions({
                        tooltips: wNumb({decimals: 0, suffix: frecuenciaLiteral})
                        });
                // console.log(currency(montoCuota));
                // 
            }  
                     
        }
