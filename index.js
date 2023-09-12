const measure = {
    "centimeter": 1,
    "inch": 2.54,
    "foot": 30.48,
    "metr": 100,
}

const form = document.getElementById('form');
const from = document.getElementById('input_unit');
const to = document.getElementById('output_unit');
const quantity = document.getElementById('input_quantity');
const result = document.getElementById("result");
const options = document.getElementsByTagName('option');

// Disable same measure for output
document.getElementById('input_unit').addEventListener('change', () => {
    for(let i in options) {
        if(options[i].style) {
            options[i].style.display = '';
        }
    }
    document.getElementById(`${from.value}_output`).style.display = 'none';
})
const outputUnit = document.getElementById('output_unit');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(from.value == 'Choose...' || to.value == 'Choose...') {
        alert('Choose measures first');
        return;
    }
    let res;
    if(measure[from.value] < measure[to.value]) {
        res = parseFloat(quantity.value) / parseFloat(measure[to.value]);
    } else {
        res = parseFloat(quantity.value) * parseFloat(measure[to.value]);
    }
    result.value = `${quantity.value} ${from.value}s is ${res} ${to.value}s`;
});

