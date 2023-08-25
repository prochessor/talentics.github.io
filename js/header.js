'use strict'
let setUpBtn = document.querySelector(".setUpBtn");
let profileBtn = document.querySelector(".profileBtn");
let notificationBtn = document.querySelector("#header_notification_id_header");

let user;

async function processNotification(not) {
    let projectResult = await fetch(`http://localhost:8383/getproject/${not.pid}`)

    let dataProject = await projectResult.json();

    let freelancer = await fetch(`http://localhost:8383/getFreelancer/${not.sender}`)
    let dataFreelancer = await freelancer.json();
    let data1 = dataFreelancer.User[0];
    let data2 = dataProject.User[0];
    console.log(dataFreelancer, dataProject);
    let html = ` <div href="#" data-pid="${data2.pid}" data-fid="${data1.id}" 
        class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600 msg">
        <div class="flex-shrink-0">
            <img class="w-11 h-11 rounded-full"
                src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                alt="User" />
        </div>
        <div class="pl-3 w-full">
            <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400 message-notification">
                <strong class="user-from-notification mr-2">${data1.username}</strong>(EXP: ${data1.experience}) applied on your project(NAME: ${data2.name}) 
            </div>
            <div class="flex gap-4 text-sm items-center">
                <a href="#" id = "acceptBtn"
                    class="border-2 border-emerald-500 px-2 py-1 hover:bg-emerald-500 hover:text-white transition-all duration-200">
                    Accept
                </a>
                <a id = "rejectBtn" href= "#"
                    class="border-2 border-red-500 px-2 py-1 hover:bg-red-500 hover:text-white transition-all duration-200">
                    Reject</a>
            </div>
        </div>
    </div>`
    let container = document.querySelector("#notification_container");
    container.insertAdjacentHTML("afterbegin", html);
}

notificationBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let container = document.querySelector("#notification_container");

    container.innerHTML = "";

    //first we will request all the notifications from the server
    let request = await fetch("http://localhost:8383/getnoti")
    let data = await request.json();


    console.log(data);


    data.Data.forEach((element) => {
        processNotification(element);
    });
})

async function getCurrentUser() {
    let res = await fetch("http://localhost:8383/", {
        method: 'GET'
    })
    let data = await res.json();
    console.log(data);
}

// When the DOMContentLoaded event is triggered
document.addEventListener('DOMContentLoaded', async () => {
    // Make a request to the server to retrieve the user ID
    const response = await fetch('/getUserId');
    user = await response.json();

    // Use the retrieved user ID as needed
    console.log(user);
    //now we will see that it is a user or client
    if (user.type == 2) {
        setUpBtn.classList.add("hide");
    }

});

profileBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    //now we will see that if the setup is done or not
    let result = await fetch('/setup');
    let data = await result.json();
    console.log(data);
    if (data.setUpStatus != "no") {
        window.location.href = "http://localhost:8383/profile.html";

    }
    else {
        window.location.href = "http://localhost:8383/setup.html";

    }
})




let noti_container = document.querySelector("#notification_container");

noti_container.addEventListener("click", async (e) => {

    e.preventDefault();
    if (e.target && e.target.matches('#acceptBtn')) {
        console.log(e.target);
        let card = e.target.closest(".msg")
        let pid = card.dataset.pid;
        let fid = card.dataset.fid;

        let res = await fetch(`http://localhost:8383/postInfoAcc/${pid} ${fid}`)
        let data = await res.json();
        console.log(data);

        window.location.href = "http://localhost:8383/payment.html";
    }
})
