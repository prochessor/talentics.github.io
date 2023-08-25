
'use strict'
let nameInput = document.querySelector('#nameAdd');
let amountInput = document.querySelector('#priceAdd');
let experienceSelect = document.querySelector('#expAdd');
let categorySelect = document.getElementById('categoryAdd');
let dueDateInput = document.querySelector('#dueDateAdd');
let commentsTextarea = document.querySelector('#commentsAdd');
let descriptionTextarea = document.querySelector('#descriptionAdd');
let detailsTextarea = document.querySelector('#detailsAdd');
let addProjectButton = document.querySelector('#postProject');
let projectName = document.querySelector('#project_name');
let projectClient = document.querySelector('#project_client');
let projectPay = document.querySelector('#project_pay');
let projectExperience = document.querySelector('#project_exp');
let projectDescription = document.querySelector('#project_description');
let projectComment = document.querySelector('#project_comment');
let projectDueDate = document.querySelector('#project_duedate');
let projectCategory = document.querySelector('#project_category');
let applyButton = document.querySelector('#applyForProject');
let detailsButton = document.querySelector('#detailsOfProject');
let projects
let projectContainer = document.querySelector("#project_container");



function getProjectCard(project, index) {
    return `<div data-id="${index}" class="col-lg-4 card-project ">

                  <div class="card card-lift--hover border-0">

                    <div class="card-body py-5 bg-gray-800">
                      <div
                        class="icon icon-shape icon-shape-white rounded-circle mb-4 bg-gradient-to-r from-sky-500 to-emerald-600">
                        <i class="fa-regular fa-map"></i>
                      </div>

                      <h6 class="text-emerald-500 text-uppercase">Project <span id="project_name">${project.name}</span> </h6>
                      <p class="description mt-3" style="color: white">Client: <span id="project_client"
                          class="underline decoration-emerald-500 underline-offset-4">${project.cid}</span>
                      </p>
                      <p class="description mt-3" style="color: white">Pay: <span id="project_pay"
                          class="underline decoration-emerald-500 underline-offset-4">${project.pay}</span>
                      </p>
                      <p class="description mt-3" style="color: white">Experience Level Required:
                        <span id="project_exp" class="underline decoration-emerald-500 underline-offset-4">${project.exReq}</span>
                      </p>
                      <p class="description mt-3" style="color: white">Description: <span id="project_description"
                          class="underline decoration-emerald-500 underline-offset-4">${project.descriptionText}</span></p>
                      <p class="description mt-3" style="color: white">Additional comments:<span
                          class="underline decoration-emerald-500 underline-offset-4" id="project_comment">${project.comments}</span></p>
                        <p class="description mt-3" style="color: white">Details:<span
                          class="underline decoration-emerald-500 underline-offset-4" id="project_detail">${project.details}</span></p>
                      <br>

                      <div>
                        <span id="project_duedate"
                          class="badge badge-pill text-white bg-gradient-to-r from-sky-700 to-emerald-600">Due
                          date: ${project.dueDate}</span>
                        <span id="project_category"
                          class="badge badge-pill text-white bg-gradient-to-r from-sky-700 to-emerald-600">${project.categoryName}</span>
                      </div>

                      <button id="applyForProject" type="submit"
                        class="btn text-white bg-gradient-to-r from-sky-500 to-emerald-600 mt-4">Apply</button>
                      
                    </div>

                  </div>
                </div>`
}

document.addEventListener("DOMContentLoaded", async () => {
    let URL = "http://localhost:8383/project";
    let result = await fetch(URL);
    let data = await result.json();
    projects = data.Projects;

    projectContainer.innerHTML = ''

    projects.forEach((project, ind) => {

        let html = getProjectCard(project, project.pid);

        projectContainer.insertAdjacentHTML("beforeend", html);

    })

})



addProjectButton.addEventListener("click", async (e) => {
    e.preventDefault();
    // let selectedCategory = categorySelect.value;
    // let selectedExp = experienceSelect.value
    let projectid = Date.now() % 50000;
    let projectInfo = [
        nameInput,
        amountInput,
        experienceSelect,
        categorySelect,
        dueDateInput,
        commentsTextarea,
        descriptionTextarea,
        detailsTextarea
    ];
    let URL = `http://localhost:8383/postproject/${projectid}^`;
    projectInfo.forEach((info) => {
        URL += (info.value + "^");
    })
    console.log(URL);
    let result = await fetch(URL);
    let response = await result.json();
    console.log(response);
})

function searchWithPname(name) {
    document.querySelector(".freelancer_section").classList.add("hidden");
    document.querySelector(".projects_section").classList.remove("hidden");
    projectContainer.innerHTML = '';
    projects.forEach((project, ind) => {
        if (project.name == name) {
            let html = getProjectCard(project, project.pid);
            projectContainer.insertAdjacentHTML("afterbegin", html);

        }
    })
}
function searchWithCategory(category) {
    document.querySelector(".freelancer_section").classList.add("hidden");
    document.querySelector(".projects_section").classList.remove("hidden");

    projectContainer.innerHTML = '';
    projects.forEach((project, ind) => {
        if (project.categoryName == category) {
            let html = getProjectCard(project, project.pid);
            projectContainer.insertAdjacentHTML("afterbegin", html);
        }
    })
}

function displayFreeLancer(user) {
    let html = ` <div class="col-lg-4 card-project">

                  <div class="card card-lift--hover border-0">

                    <div class="card-body py-5 bg-gray-800">
                      <div
                        class="icon icon-shape icon-shape-white rounded-circle mb-4 bg-gradient-to-r from-sky-500 to-emerald-600">
                        <i class="fa-regular fa-user"></i>
                      </div>

                      <div>
                        <h6 class="text-emerald-500 text-uppercase"><span id="freelancer_username">${user.username}</span> </h6>
                        <p class="description mt-3" style="color: white">Description: <span id="freelancer_desc"
                            class="underline decoration-emerald-500 underline-offset-4">${user.descriptionText}</span>
                        </p>
                        <p class="description mt-3" style="color: white">Years of Experience:
                          <span id="freelancer_exp"
                            class="underline decoration-emerald-500 underline-offset-4">${user.experience}</span>
                        </p>
                        <p class="description mt-3" style="color: white">Country: <span
                            class="underline decoration-emerald-500 underline-offset-4" id="freelancer_country">
                            ${user.country}</span></p>

                        <br>
                        <span id="freelancer_category"
                          class="badge badge-pill text-white bg-gradient-to-r from-sky-700 to-emerald-600">${user.categoryName}</span>
                      </div>

                      <button id="textFreelancer" type="submit"
                        class="btn text-white bg-gradient-to-r from-sky-500 to-emerald-600 mt-4">Chat</button>
                    </div>
                  </div>
                </div>`
    let container = document.querySelector("#freelancer_container");
    container.insertAdjacentHTML("afterbegin", html);
}

async function searchFreelancer(searchValue) {
    document.querySelector(".freelancer_section").classList.remove("hidden");
    document.querySelector(".projects_section").classList.add("hidden");
    let container = document.querySelector("#freelancer_container");
    container.innerHTML = "";
    let fURL = "http://localhost:8383/freelancer"
    let result = await fetch(fURL);
    let data = await result.json();
    console.log(data);
    if (searchValue == "") {
        //all free lancer   
        let freelancers = data.User;
        freelancers.forEach((freelancer) => {
            displayFreeLancer(freelancer)
        })
    }
    else {
        //freelancer with specific name     
        let freelancers = data.User;
        freelancers.forEach((freelancer) => {
            if (freelancer.username == searchValue)
                displayFreeLancer(freelancer)
        })
    }
}
let filter = document.querySelector("#filter");
let searchBox = document.querySelector("#searchBox")
document.querySelector("#search").addEventListener("click", (e) => {
    e.preventDefault();

    if (filter.value == '') {
        if (searchBox.value != "") {
            //this means that we have to search with respect to the project name
            searchWithPname(searchBox.value);
        }
    }
    else if (filter.value == "Freelancer") {
        //this means that we have to search with respect to the project name
        searchFreelancer(searchBox.value);

    }
    else {
        searchWithCategory(filter.value);
    }
})

projectContainer.addEventListener("click", async (e) => {

    e.preventDefault();
    if (e.target && e.target.matches('#applyForProject')) {

        let card = e.target.closest(".card-project")
        let pid = card.dataset.id;
        let client = card.querySelector("#project_client");
        console.log(client, card);
        let cid = client.textContent;
        let currentUser = await fetch("http://localhost:8383/getUserId")
        let data = await currentUser.json();

        //now we will add notification 
        let nid = Date.now() % 5000;
        let resultNotification = await fetch(`http://localhost:8383/addNot/${nid} ${data.id} ${cid} ${pid}`)
        let res = await resultNotification.json();
        console.log(res);

    }
})

