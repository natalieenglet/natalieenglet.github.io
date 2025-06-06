
/*

Natalie Englet 

*/
// Function to update the formula display based on selected conversion type
function updateFormula() {
    const operation = document.getElementById("conversion-type").value;
    const selectionDisplay = document.getElementById("formula");

    if (operation === 'ftoc') {
        selectionDisplay.innerHTML = "C = (°F - 32) × 5/9";
    } else {
        selectionDisplay.innerHTML = "F = (°C × 9/5) + 32";
    }
}

// Function to assess temperature and provide text and color indicators
function assessTemperature(temp, scale) {
    const tempElement = document.getElementById("temp-assessment");
    let assessment = "";
    let color = "";

    if (scale === "celsius") {
        if (temp <= 0) {
            assessment = "Very Cold";
            color = "#3498db";
        } else if (temp < 10) {
            assessment = "Cold";
            color = "#7fb3d5";
        } else if (temp < 20) {
            assessment = "Cool";
            color = "#a9cce3";
        } else if (temp < 30) {
            assessment = "Moderate";
            color = "#2ecc71";
        } else if (temp < 40) {
            assessment = "Warm";
            color = "#f39c12";
        } else {
            assessment = "Hot";
            color = "#e74c3c";
        }
    } else { // Fahrenheit
        if (temp <= 32) {
            assessment = "Very Cold";
            color = "#3498db";
        } else if (temp < 50) {
            assessment = "Cold";
            color = "#7fb3d5";
        } else if (temp < 68) {
            assessment = "Cool";
            color = "#a9cce3";
        } else if (temp < 86) {
            assessment = "Moderate";
            color = "#2ecc71";
        } else if (temp < 104) {
            assessment = "Warm";
            color = "#f39c12";
        } else {
            assessment = "Hot";
            color = "#e74c3c";
        }
    }

    tempElement.textContent = `Temperature Assessment: ${assessment}`;
    tempElement.style.color = color;
    tempElement.style.fontWeight = "bold";
}

// Function to perform temperature conversion based on selection
function convertTemperature() {
    const inputElement = document.getElementById("temperature");
    const temperatureValue = parseFloat(inputElement.value);
    const conversionType = document.getElementById("conversion-type").value;
    const resultElement = document.getElementById("conversion-result");

    if (isNaN(temperatureValue)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        document.getElementById("temp-assessment").textContent = "";
        return;
    }

    let result;

    if (conversionType === "ftoc") {
        result = (temperatureValue - 32) * 5 / 9;
        resultElement.textContent = `${temperatureValue}°F = ${result.toFixed(2)}°C`;
        assessTemperature(result, "celsius");
    } else {
        result = (temperatureValue * 9 / 5) + 32;
        resultElement.textContent = `${temperatureValue}°C = ${result.toFixed(2)}°F`;
        assessTemperature(result, "fahrenheit");
    }
}

// Function to clear the converter
function clearConverter() {
    document.getElementById("temperature").value = "";
    document.getElementById("conversion-result").textContent = "";
    document.getElementById("temp-assessment").textContent = "";
    document.getElementById("formula").textContent = "";
}
