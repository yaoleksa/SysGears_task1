// Define default measures
const fileReader = new FileReader();
const measure = {
    "cm": 1,
    "in": 2.54,
    "ft": 30.48,
    "m": 100,
}

// Get all required components
const form = document.getElementById('form');
const from = document.getElementById('input_unit');
const to = document.getElementById('output_unit');
const quantity = document.getElementById('input_quantity');
const result = document.getElementById("result");
const options = document.getElementsByTagName('option');

// Define disable helper
const disableHelper = (event) => {
    for(let i in options) {
        if(options[i].style) {
            options[i].style.display = '';
        }
    }
    if(from.value && from.value != 'Choose...') {
        document.getElementById(`${from.value}_output`).style.display = 'none';
    }
    if(to.value && to.value != 'Choose...') {
        document.getElementById(`${to.value}_input`).style.display = 'none';
    }
    event.target.style.color = 'black';
}

// Disable same measure for output
document.getElementById('input_unit').addEventListener('change', disableHelper);
// Disable same measure for input
document.getElementById('output_unit').addEventListener('change', disableHelper);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(from.value == 'Choose...' || to.value == 'Choose...') {
        alert('Choose measures first');
        return;
    }
    if(!quantity.value) {
        alert('Input quantity first');
    }
    let res;
    if(measure[from.value] < measure[to.value]) {
        res = (parseFloat(quantity.value) * parseFloat(measure[from.value])) / parseFloat(measure[to.value]);
    } else {
        res = (parseFloat(measure[from.value]) / parseFloat(measure[to.value])) * parseFloat(quantity.value);
    }
    const transform = {
        "m": "meter",
        "ft": "foot",
        "in": "inch",
        "cm": "centimeter"
    }
    result.value = `${quantity.value} ${transform[from.value]}s is ${res} ${transform[to.value]}s`;
});

