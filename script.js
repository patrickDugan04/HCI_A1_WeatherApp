//  Used chat gpt to help implement

data = {"UVI" : "4", "Humidity" : "68%", "Precipitation" : "1”", "Air Pressure" : "30 inHg", "Wind Speed" : "5 mph"}

desc = {"UVI" : "The UVI or UV index measures the strength of the UV radiation from the sun. It is calculated proportional to the net radiation across wavelengths that harm the human skin.", 
    "Humidity" : "Humidity is a measure of how much water vapor is in the air as a percentage of the amount needed to saturate the air. ", 
    "Precipitation" : "Precipitation is the amount of rain expected to fall in the day measured in inches. ", 
    "Air Pressure" : "Air pressure measures the atmospheric pressure in your location. This is the pressure created from the weight of the air pushing down measured in inches of mercury inHg. ", 
    "Wind Speed" : "Wind speed measures the speed of the wind in miles per hour (mph)"}

// set up info boxes
const infoBoxes = document.getElementById("info-boxes")
const boxes = infoBoxes.getElementsByClassName('info-box'); 
console.log(boxes);
count = 0
for (const box of boxes) {
    box.setAttribute("id", "info-box" + count)
    box.addEventListener("click", function(){ showDropdown(box)});
    box.addEventListener("mouseover", showDescription);
    box.addEventListener("mouseleave", hideDescription);
    count += 1;
}


// Set up dropdown buttons
const dropdown = document.getElementById('dropdown-menu');
const list = dropdown.querySelector('ul'); 
const items = list.querySelectorAll('li'); 
for (const item of items) {
    const type = item.getAttribute("type");
    item.textContent = type;
    item.setAttribute("target", "info-box1")

    item.addEventListener('click', function(e){ 
        const target = document.getElementById((e.target).getAttribute("target"))
        target.setAttribute("type", type)
        updateInfoBox(target) });
}




function updateInfoBox(box) {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.classList.toggle('hidden', true);

    const type = box.getAttribute("type");
    if (box != null) {
        box.innerHTML = `${type} <br> ${data[type]}`;
    }
}




function showDropdown(infoBox) {
    //hide the description box
    const popup = document.getElementById('description');
    popup.classList.toggle('hidden', true);

    curClickedElem = infoBox
    const dropdown = document.getElementById('dropdown-menu');
    console.log("show dropdown triggered");
    dropdown.classList.toggle('hidden', false);
    dropdown.style.position = 'absolute';
    dropdown.style.top = infoBox.offsetTop + infoBox.offsetHeight + 'px';
    dropdown.style.left = infoBox.offsetLeft + 'px';
    const list = dropdown.querySelector('ul'); 
    const items = list.querySelectorAll('li'); 
    for (const item of items) {
        item.setAttribute("target", infoBox.getAttribute("id"))
    }
}



function showDescription(event) {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown.getAttribute("target") != event.target) {
        dropdown.classList.toggle('hidden', true);
    } else if (!dropdown.classList.contains("hidden")) {
        return;
    }

    target = event.target;
    const popup = document.getElementById('description');
    popup.classList.toggle('hidden', false);
    popup.style.position = 'absolute';
    popup.style.top = target.offsetTop + target.offsetHeight + 'px';
    popup.style.left = target.offsetLeft - 30 + 'px';
    const type = target.getAttribute("type");
    popup.innerHTML = `${desc[type]}`;
}

function hideDescription(event) {
    const popup = document.getElementById('description');
    popup.classList.toggle('hidden', true);
}



