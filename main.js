window.onload = function () {

  // Slider Scripts
  const amountSlider = document.querySelector('#amountSlider');
  const termSlider = document.querySelector('#termSlider');
  const termLabelStart = document.querySelector('#termLabelStart');
  const termLabelEnd = document.querySelector('#termLabelEnd');

  const amountInput = document.querySelector('#amountInput');
  const termInput = document.querySelector('#termInput');
  const installmentInput = document.querySelector('#installmentInput');
  const frequencyLabel = document.querySelector('#frequencyLabel');
  const installmentAmount = document.querySelector('#installmentAmount');
  const monthlyCheck = document.querySelector('#monthlyCheck');

  // Constants
  const [CLOSING_FEES, MONTHLY_RATE, BIWEEKLY_RATE] = [500, 0.06, 0.03];

  // Define minimum and maximum loan amounts
  const amountRange = [3000, 15000];

  // Define loan term limits
  const termRange = [4, 24];

  // Configure amount slider
  noUiSlider.create(amountSlider, {
    start: 10000,
    connect: 'lower',
    range: {
      'min': amountRange[0],
      'max': amountRange[1]
    },
    step: 1000,
    tooltips: wNumb({
      prefix: '$',
      decimals: 2,
      thousand: ','
    })
  });

  // Configure term slider
  noUiSlider.create(termSlider, {
    start: 12,
    connect: 'lower',
    range: {
      'min': termRange[0],
      'max': termRange[1]
    },
    step: 1,
    tooltips: wNumb({
      decimals: 0
    })
  });

  // Set slider values on input
  amountSlider.noUiSlider.on('update', function (values, handle) {
    amountInput.value = parseFloat(values[handle].replace(/[\$,]/g, ''));
    updateInstallmentAmount();
  });

  termSlider.noUiSlider.on('update', function (values, handle) {
    termInput.value = parseInt(values[handle]);
    updateInstallmentAmount();
  });

  // Calculate the installment amount
  function updateInstallmentAmount() {

    let installment = 0;
    const amount = parseFloat(amountInput.value);
    const term = parseInt(termInput.value);

    if (monthlyCheck.checked) {
      frequencyLabel.innerHTML = "Monthly Installment";
      termLabelStart.innerHTML = "2 Months";
      termLabelEnd.innerHTML = "12 Months";
      installment = ((amount + CLOSING_FEES) / term) + ((amount + CLOSING_FEES) * MONTHLY_RATE);
      // termRange = [2, 12];

    } else {
      frequencyLabel.innerHTML = "Bi-weekly Installment";
      termLabelStart.innerHTML = "4 Bi-weeks";
      termLabelEnd.innerHTML = "24 Bi-weeks";
      installment = ((amount + CLOSING_FEES) / term) + ((amount + CLOSING_FEES) * BIWEEKLY_RATE);
      // termRange = [4, 24];

    }

    // termSlider.noUiSlider.updateOptions({
    //   range: {
    //     'min': termRange[0],
    //     'max': termRange[1]
    //   }
    // });

    installmentAmount.innerHTML = wNumb({
      prefix: '$',
      decimals: 2,
      thousand: ','
    }).to(installment);
    installmentInput.value = installment.toFixed(2);
  }

  // Add event listener to payment frequency radio buttons
  const paymentFrequencyRadios = document.getElementsByName('paymentFrequency');
  paymentFrequencyRadios.forEach(checkbox => checkbox.addEventListener('change', updateInstallmentAmount));

  // Initialize installment amount on page load
  // updateInstallmentAmount();

};
