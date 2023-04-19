const inputDay = {
    element: document.querySelector(".container-day"),
    label: null,
    input: null,
    value: null,
    error: null,
    errorMsg: null,  
};
const inputMonth = {
    element: document.querySelector(".container-month"),
    label: null,
    input: null,
    value: null,
    error: null,
    errorMsg: null,  
};
const inputYear = {
    element: document.querySelector(".container-year"),
    label: null,
    input: null,
    value: null,
    error: null,
    errorMsg: null,   
};
const inputs = [inputDay, inputMonth, inputYear];
initializeInputs(inputs);

const date = new Date();

const submit = document.querySelector(".btn");
submit.addEventListener("click", validateInput);
for (var i = 0; i < inputs.length; i++) {
    inputs[i].input.addEventListener("keydown", function(e) {
        if (e.key == "Enter") {
            validateInput();
        }
    });
}

function validateInput() {

    for(var i = 0; i < inputs.length; i++) {
        inputs[i].value = inputs[i].input.value;
        // debugger;
        if (inputs[i].value === "")
        {
            inputs[i].errorMsg = "This field is required";
            errorMsg(i);
            showError(i);
        }
        else if ((inputs[i].value / inputs[i].value) != 1 ) {
            switch(inputs[i].label.innerHTML) {
                case "DAY":
                    inputs[i].errorMsg = "Must be a valid day";
                    errorMsg(i);
                    break;
                case "MONTH":
                    inputs[i].errorMsg = "Must be a valid month";
                    errorMsg(i);
                    break;
                case "YEAR":
                    inputs[i].errorMsg = "Must be a valid year";
                    errorMsg(i);
                    break;
            }
            showError(i);
        }
        else if (inputs[i].label.innerHTML == "MONTH" && inputs[i].value > 12) {
            inputs[i].errorMsg = "Must be a valid month";
            errorMsg(i);
            showError(i);
        }
        else if (inputs[i].label.innerHTML == "DAY" && inputs[i].value > 31) {
            inputs[i].errorMsg = "Must be a valid day";
            errorMsg(i);
            showError(i);
        }
        else if (inputs[i].label.innerHTML == "DAY" && inputs[i].value < 32) {
            // debugger;
            switch(inputMonth.value) {
                default:
                    if (inputs[i].value > 31) {
                        inputs[i].errorMsg = "Must be a valid day";
                        errorMsg(i);
                        showError(i);
                        break;
                    }
                    else {
                        removeError(i);
                        break;
                    }
                case "2":
                case "02":
                    if (inputs[i].value > 28) {
                        inputs[i].errorMsg = "Must be a valid day";
                        errorMsg(i);
                        showError(i);
                        break;
                    }
                    else {
                        removeError(i);
                        break;
                    }
                case "4":
                case "04":
                case "6":
                case "06":
                case "9":
                case "09":
                case "11":
                    if (inputs[i].value > 30) {
                        inputs[i].errorMsg = "Must be a valid day";
                        errorMsg(i);
                        showError(i);
                        break;
                    }
                    else {
                        removeError(i);
                        break;
                    }
            }
        }
        else if (inputs[i].label.innerHTML == "YEAR" && inputs[i].value.length != 4) {
            // debugger;
            inputs[i].errorMsg = "Must be a valid year";
            errorMsg(i);
            showError(i);
        }
        else if (inputs[i].label.innerHTML == "YEAR" && inputs[i].value > date.getFullYear()) {
            // debugger;
            inputs[i].errorMsg = "Must be in the past";
            errorMsg(i);
            showError(i);
        }
        else if (inputs[i].label.innerHTML == "MONTH" && inputs[i].value > date.getMonth() + 1 && inputYear.value == date.getFullYear()) {
            inputs[i].errorMsg = "Must be in the past";
            errorMsg(i);
            showError(i);
        }
        else if (inputs[i].label.innerHTML == "DAY" && input[i].value > date.getDate() && inputMonth.value == date.getMonth + 1) {
            inputs[i].errorMsg = "Must be in the past";
            errorMsg(i);
            showError(i);
        }
        else {
            console.log(inputs);
            console.log(date.getDate());
            removeError(i);
        }
    }
}

function errorMsg(input) {
    inputs[input].error.innerHTML = inputs[input].errorMsg;
}

function showError(input) {
    inputs[input].error.classList.remove("inv");
    inputs[input].label.classList.add("error");
}

function removeError(input) {
    inputs[input].error.classList.add("inv");
    inputs[input].label.classList.remove("error");
}

function initializeInputs(input) {
    for (var i = 0; i < input.length; i++) {
        input[i].label = input[i].element.querySelector(".input-label");
        input[i].input = input[i].element.querySelector(".input");
        input[i].value = input[i].input.value;
        input[i].error = input[i].element.querySelector(".error");
        input[i].errorMsg = ""
    }
}