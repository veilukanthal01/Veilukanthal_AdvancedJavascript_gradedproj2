window.addEventListener('load', getData);

let index = 0;
let filteredData = [];
let filteredDataIndex = 0;

let foundOne = false;
const none = document.getElementById('no-result-container');
const searchInput = document.getElementById('job-search');
const data = document.getElementById("common-container");
show(false);

let previous = document.getElementById('previous');
let next = document.getElementById('next');

previous.addEventListener('click', function () {
    var inputStr = document.getElementById("job-search").value;
    document.querySelector('#skillList').innerHTML = "";
    document.querySelector('#hobbiesList').innerHTML = "";
    if ((inputStr == '' || inputStr == 'Enter job name')) {
        if (index > 0) {
            previous.style.visibility = 'visible';
            next.style.visibility = 'visible';
            displayCandidate(obj.resume[--index]);
        }
        else if (index == 0) {
            next.style.visibility = 'visible';
            previous.style.visibility = 'hidden';
        }
    }
    else if (filteredData.length > 1) {
        if (filteredDataIndex > 0) {
            previous.style.visibility = 'visible';
            next.style.visibility = 'visible';
            displayFilteredCandidate(filteredData[--filteredDataIndex]);
        }
        else if (filteredDataIndex == 0) {
            next.style.visibility = 'visible';
            previous.style.visibility = 'hidden';
        }

    }
});

next.addEventListener('click', function () {
    document.querySelector('#skillList').innerHTML = "";
    document.querySelector('#hobbiesList').innerHTML = "";
    var inputStr = document.getElementById("job-search").value;
    if ((inputStr == '' || inputStr == 'Enter job name')) {
        if (index < (obj.resume.length - 1)) {
            next.style.visibility = 'visible';
            previous.style.visibility = 'visible';
            displayCandidate(obj.resume[++index]);
        }
        else if (index == (obj.resume.length - 1)) {
            previous.style.visibility = 'visible';
            next.style.visibility = 'hidden';
        }
    }
    else if (filteredData.length > 1) {
        if (filteredDataIndex < (filteredData.length - 1)) {
            next.style.visibility = 'visible';
            previous.style.visibility = 'visible';
            displayFilteredCandidate(filteredData[++filteredDataIndex]);
        }
        else if (filteredDataIndex == (filteredData.length - 1)) {
            previous.style.visibility = 'visible';
            next.style.visibility = 'hidden';
        }

    }

});


//FETCH CALLS
function getData() {

    fetch('Data.json')
        .then(checkStatus)
        .then(response => response.json())
        .then(data => obj = data)
        .then(() => displayCandidate(obj))
        .then(getResponse)
}


function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function displayCandidate() {
    data.style.display = 'block';
    if (index == 0) {
        next.style.visibility = 'visible';
        previous.style.visibility = 'hidden';
    }
    if (index == (obj.resume.length - 1)) {
        previous.style.visibility = 'visible';
        next.style.visibility = 'hidden';
    }

    document.querySelector('#candidate-name').innerHTML = obj.resume[index].basics.name;
    document.querySelector('#applied-for').innerHTML = 'Applied for : ' + obj.resume[index].basics.AppliedFor;
    document.querySelector('#work-experience-company-name').innerHTML = obj.resume[index].work['Company Name'];
    document.querySelector('#work-experience-position').innerHTML = obj.resume[index].work['Position'];
    document.querySelector('#work-experience-start-date').innerHTML = obj.resume[index].work['Start Date'];
    document.querySelector('#work-experience-end-date').innerHTML = obj.resume[index].work['End Date'];
    document.querySelector('#work-experience-summary').innerHTML = obj.resume[index].work['Summary'];
    document.querySelector('#project-name').innerHTML = obj.resume[index].projects['name'];
    document.querySelector('#project-description').innerHTML = obj.resume[index].projects['description'];
    document.querySelector('#phone').innerHTML = obj.resume[index].basics['phone'];
    document.querySelector('#email').innerHTML = obj.resume[index].basics['email'];
    document.querySelector('#network').innerHTML = obj.resume[index].basics.profiles['network'];
    const link = document.getElementById('network');
    link.href = JSON.stringify(obj.resume[index].basics.profiles['url']);
    document.querySelector('#education-ug').innerHTML = Object.values(obj.resume[index].education['UG']).join(',');
    document.querySelector('#education-pu').innerHTML = Object.values(obj.resume[index].education['Senior Secondary']).join(',');
    document.querySelector('#education-hsc').innerHTML = Object.values(obj.resume[index].education['High School']).join(',');
    document.querySelector('#internship-companyname').innerHTML = obj.resume[index].Internship['Company Name'];
    document.querySelector('#internship-position').innerHTML = obj.resume[index].Internship['Position'];
    document.querySelector('#internship-start-date').innerHTML = obj.resume[index].Internship['Start Date'];
    document.querySelector('#internship-end-date').innerHTML = obj.resume[index].Internship['End Date'];
    document.querySelector('#internship-summary').innerHTML = obj.resume[index].Internship['Summary'];
    let array = obj.resume[index].achievements.Summary;
    document.querySelector('#achievements-summary').innerHTML = array.join(", ");
    let skills = obj.resume[index].skills.keywords;
    let list = document.getElementById("skillList");
    skills.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });
    skills = [];

    let hobbies = obj.resume[index].interests.hobbies;
    let hobbiesList = document.getElementById("hobbiesList");
    hobbies.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        hobbiesList.appendChild(li);
    });
    hobbies = [];


}

function displayFilteredCandidate() {
    data.style.display = 'block';
    if (filteredDataIndex == 0 && filteredData.length > 1) {
        next.style.visibility = 'visible';
        previous.style.visibility = 'hidden';
    }
    if (filteredDataIndex == (filteredData.length - 1) && filteredData.length > 1) {
        previous.style.visibility = 'visible';
        next.style.visibility = 'hidden';
    }
    document.querySelector('#candidate-name').innerHTML = filteredData[filteredDataIndex].basics.name;
    document.querySelector('#applied-for').innerHTML = 'Applied for : ' + filteredData[filteredDataIndex].basics.AppliedFor;
    document.querySelector('#work-experience-company-name').innerHTML = filteredData[filteredDataIndex].work['Company Name'];
    document.querySelector('#work-experience-position').innerHTML = filteredData[filteredDataIndex].work['Position'];
    document.querySelector('#work-experience-start-date').innerHTML = filteredData[filteredDataIndex].work['Start Date'];
    document.querySelector('#work-experience-end-date').innerHTML = filteredData[filteredDataIndex].work['End Date'];
    document.querySelector('#work-experience-summary').innerHTML = filteredData[filteredDataIndex].work['Summary'];
    document.querySelector('#project-name').innerHTML = filteredData[filteredDataIndex].projects['name'];
    document.querySelector('#project-description').innerHTML = filteredData[filteredDataIndex].projects['description'];
    document.querySelector('#phone').innerHTML = filteredData[filteredDataIndex].basics['phone'];
    document.querySelector('#email').innerHTML = filteredData[filteredDataIndex].basics['email'];
    document.querySelector('#network').innerHTML = filteredData[filteredDataIndex].basics.profiles['network'];
    const link = document.getElementById('network');
    link.href = JSON.stringify(filteredData[filteredDataIndex].basics.profiles['url']);
    document.querySelector('#education-ug').innerHTML = Object.values(filteredData[filteredDataIndex].education['UG']).join(',');
    document.querySelector('#education-pu').innerHTML = Object.values(filteredData[filteredDataIndex].education['Senior Secondary']).join(',');
    document.querySelector('#education-hsc').innerHTML = Object.values(filteredData[filteredDataIndex].education['High School']).join(',');
    document.querySelector('#internship-companyname').innerHTML = filteredData[filteredDataIndex].Internship['Company Name'];
    document.querySelector('#internship-position').innerHTML = filteredData[filteredDataIndex].Internship['Position'];
    document.querySelector('#internship-start-date').innerHTML = filteredData[filteredDataIndex].Internship['Start Date'];
    document.querySelector('#internship-end-date').innerHTML = filteredData[filteredDataIndex].Internship['End Date'];
    document.querySelector('#internship-summary').innerHTML = filteredData[filteredDataIndex].Internship['Summary'];
    let array = filteredData[filteredDataIndex].achievements.Summary;
    document.querySelector('#achievements-summary').innerHTML = array.join(", ");
    let skills = filteredData[filteredDataIndex].skills.keywords;
    let list = document.getElementById("skillList");
    skills.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });
    skills = [];

    let hobbies = filteredData[filteredDataIndex].interests.hobbies;
    let hobbiesList = document.getElementById("hobbiesList");
    hobbies.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        hobbiesList.appendChild(li);
    });
    hobbies = [];

}

function getResponse() {
    return obj;
}

function filterJobData(job) {

    if (job != '') {
        filteredData = obj.resume.filter(function (item) {
            return (item.basics["AppliedFor"].toLowerCase()) === job.toLowerCase();
        });
    }
    return filteredData;
}

//no search result
searchInput.addEventListener('input', function (event) {

    filteredDataIndex = 0;
    filteredData = [];
    var inputStr = document.getElementById("job-search").value;
    document.querySelector('#common-container').style.display = "block";
    none.style.display = "none";
    // reset state
    show(false);
    foundOne = false;
    const input = event.target;


    if (input.value) {
        var filterObj = filterJobData(inputStr);
        if (filterObj.length < 1) {
            none.style.display = 'block';
            //none.innerHTML = "No Result Found";
            index = 0;
            filteredDataIndex = 0;
            data.style.display = 'none';
            document.querySelector('#skillList').innerHTML = "";
            document.querySelector('#hobbiesList').innerHTML = "";
            displayCandidate();
            document.querySelector('#common-container').style.display = "none";
        }
        else if (filterObj.length == 1) {
            next.style.visibility = 'hidden';
            previous.style.visibility = 'hidden';
            data.style.display = 'block';
            document.querySelector('#skillList').innerHTML = "";
            document.querySelector('#hobbiesList').innerHTML = "";
            displayFilteredCandidate();
        }

        else {
            data.style.display = 'block';
            document.querySelector('#skillList').innerHTML = "";
            document.querySelector('#hobbiesList').innerHTML = "";
            displayFilteredCandidate();
        }

    }

    else if (!input.value) {
        resetState();
    }
});



function resetState() {
    index = 0;
    document.querySelector('#skillList').innerHTML = "";
    document.querySelector('#hobbiesList').innerHTML = "";
    displayCandidate();
    data.style.display = 'block';

}
function show(bool) {
    none.style.display = bool ? 'block' : 'none';
    if (bool === false) {
        data.style.display = 'none';
        document.querySelector('#skillList').innerHTML = "";
        document.querySelector('#hobbiesList').innerHTML = "";
    }

}
