// Define default measures
const measure = {
    "centimeter": 1,
    "inch": 2.54,
    "foot": 30.48,
    "metr": 100,
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
        console.log(`to ${measure[to.value]} from ${measure[from.value]}`);
        res = (parseFloat(quantity.value) * parseFloat(measure[from.value])) / parseFloat(measure[to.value]);
    } else {
        console.log(`to ${measure[to.value]} from ${measure[from.value]}`);
        res = (parseFloat(measure[from.value]) / parseFloat(measure[to.value])) * parseFloat(quantity.value);
    }
    result.value = `${quantity.value} ${from.value}s is ${res} ${to.value}s`;
});

