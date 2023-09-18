// Define request to get measure object
const request = new XMLHttpRequest();

// Handle request
request.open('GET', 'https://length-converter-jyqm.onrender.com', false);
request.send();

// Define measure holder
const measure = {};

// Get all required components
const form = document.getElementById('form');
const from = document.getElementById('input_unit');
const to = document.getElementById('output_unit');
const quantity = document.getElementById('input_quantity');
const result = document.getElementById("result");

// Get response
if(request.status == 200) {
    const response = JSON.parse(request.responseText);
    for(let i in response) {
        measure[i] = response[i];
        let newSelectOptionInput = document.createElement('option');
        newSelectOptionInput.value = i;
        newSelectOptionInput.id = `${i}_input`;
        newSelectOptionInput.class = 'not_default';
        newSelectOptionInput.innerText = i;
        let newSelectOptionOutput = document.createElement('option');
        newSelectOptionOutput.value = i;
        newSelectOptionOutput.id = `${i}_output`;
        newSelectOptionOutput.class = 'not_default';
        newSelectOptionOutput.innerText = i;
        from.appendChild(newSelectOptionInput);
        to.appendChild(newSelectOptionOutput);
    }
}

// Get options when it exists
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

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://length-converter-jyqm.onrender.com");
    xhr.send(`{
        "distance": {
            "unit": "${from.value}",
            "value": "${quantity.value}"
        },
        "convertTo": "${to.value}"
    }`);
    xhr.onload = () => {
        const responseData = JSON.parse(xhr.responseText);
        result.value = `${responseData.unit}s is ${responseData.value} ${to.value}s`;
    }
});