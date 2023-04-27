const inputDay = {
    element: document.querySelector(".container-day"),
    label: null,
    input: null,
    value: null,
    error: null,
    errorMsg: null, 
    valid: null, 
};
const inputMonth = {
    element: document.querySelector(".container-month"),
    label: null,
    input: null,
    value: null,
    error: null,
    errorMsg: null,  
    valid: null,
};
const inputYear = {
    element: document.querySelector(".container-year"),
    label: null,
    input: null,
    value: null,
    error: null,
    errorMsg: null,  
    valid: null, 
};
const inputs = [inputDay, inputMonth, inputYear];
initializeInputs(inputs);

const years = document.querySelector(".output-years-result");
const months = document.querySelector(".output-months-result");
const days = document.querySelector(".output-days-result");


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
    getInput();
    for (let i = 0; i < inputs.length; i++) {
        if (!isEmpty(i)) {
            if (isNumber(i) && isValid(i)) {
                // debugger;
                if (isPast(i)) {
                    inputs[i].valid = true;
                }
                else {
                    pastError(i);
                }
            }
            else {
                validError(i);
            }
        }
        else {
            errorMsg(i, "This field is required");
            inputs[i].valid = false;
        }

    }
    if (isValidated())
    {
        showError();
        calculateAge();
    }
    else {
        showError();
    }
}

function calculateAge() {
    let d, m, y = 0;
    let year = inputYear.value,
    month = inputMonth.value,
    day = inputDay.value;
    let cYear = date.getFullYear(),
    cMonth = date.getMonth() + 1,
    cDay = date.getDate();

    y = cYear - year;

    if (cMonth >= month) {
        m = cMonth - month;
    }
    else {
        y--;
        m = 12 + cMonth - month;
    }

    if (cDay >= day) {
        d = cDay - day;
    }
    else {
        m--;
        d = 31 + cDay - day;
    }
    if (m < 0) {
        m = 11;
        y--;
    }

    years.innerHTML = y, months.innerHTML = m, days.innerHTML = d;
}

function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

function isValidated() {
    if (inputDay.valid === true &&
        inputMonth.valid === true &&
        inputYear.valid === true) {
            return true;
        }
    else {
        return false;
    }
}

function isPast(index) {
    switch (inputs[index].label.innerHTML.toLowerCase()) {
        case "day":
            if (parseInt(inputYear.value) >= date.getFullYear() &&
                parseInt(inputMonth.value) >= date.getMonth() + 1 &&
                parseInt(inputs[index].value) > date.getDate() ) {
                    return false;
                }
                else {
                    return true;
                }
        case "month":
            if (parseInt(inputYear.value) >= date.getFullYear() &&
                parseInt(inputs[index].value) > date.getMonth() + 1) {
                    return false;
                }
                else {
                    return true;
                }
        case "year":
            if (inputs[index].value > date.getFullYear()) {
                return false;
            }
            else {
                return true;
            }
    }
    return true;
}

function pastError(index) {
    errorMsg(index, "Must be in the past");
    inputs[index].valid = false;
}

function isValid(index) {
    switch (inputs[index].label.innerHTML.toLowerCase()) {
        case "day":
            if (inputs[index].value < 32) {
                switch (inputMonth.value) {
                    default:
                        return true;
                    case "2":
                    case "02":
                        if (inputs[index].value > 28) {
                            if (isLeapYear(inputYear.value)) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            return true;
                        }
                    case "4":
                    case "04":
                    case "6":
                    case "06":
                    case "9":
                    case "09":
                    case "11":
                        if (inputs[index].value > 30) {
                            return false;
                        }
                        else {
                            return true;
                        }
                }
            }
            else {
                return false;
            }
        case "month":
            if (inputs[index].value < 13) {
                return true;
            }
            else {
                return false;
            }
        case "year": 
            if (inputs[index].value.length === 4) {
                return true;
            }
            else {
                return false;
            }
    }
}

function validError(index) {
    switch(inputs[index].label.innerHTML.toLowerCase()) {
        case "day":
            errorMsg(index, "Must be a valid day");
            break;
        case "month":
            errorMsg(index, "Must be a valid month");
            break;
        case "year":
            errorMsg(index, "Must be a valid year");
            break;
    }
    inputs[index].valid = false;

}

function isNumber(index) {
    if (inputs[index].value / inputs[index].value != 1) {
        return false;
    }
    return true;
}

function isEmpty(index) {
    if (inputs[index].value === "") {
        return true;
    }
    else {
        return false;
    }

}

function getInput() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = inputs[i].input.value;
    }
}

function errorMsg(index, errorMessage) {
    inputs[index].errorMsg = errorMessage;
    inputs[index].error.innerHTML = inputs[index].errorMsg;
}

function showError() {
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].valid) {
            inputs[i].error.classList.remove("inv");
            inputs[i].label.classList.add("error");
            inputs[i].input.classList.add("error-label")
            years.innerHTML = "- -";
            months.innerHTML = "- -";
            days.innerHTML = "- -";
        }
        else {
            removeError(i);
        }
    }
}

function removeError(index) {
    inputs[index].error.classList.add("inv");
    inputs[index].label.classList.remove("error");
    inputs[index].input.classList.remove("error-label");
}

function initializeInputs(input) {
    for (var i = 0; i < input.length; i++) {
        input[i].label = input[i].element.querySelector(".input-label");
        input[i].input = input[i].element.querySelector(".input");
        input[i].value = input[i].input.value;
        input[i].error = input[i].element.querySelector(".error");
        input[i].errorMsg = ""
        input[i].valid = true;
    }
}