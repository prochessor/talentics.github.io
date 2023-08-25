const signUpButton = document.getElementById("signUpMenu");
const signInButton = document.getElementById("signInMenu");
const container = document.getElementById("container");
const userURL = 'http://localhost:8383/User/';
const registerURL = 'http://localhost:8383/Register/';
let email = document.querySelector("#SignInEmail");
let password = document.querySelector("#SignInPassword");



async function checkUser(email, password) {
    let res = await fetch(userURL + `${email} ${password}`, {
        method: 'GET'
    })
    const data = await res.json();
    console.log(data);
    if (data.User == "Not Found") {

        alert("Incorrent credentials No user found")

    }
    else
        window.location.href = "http://localhost:8383/home.html";


}


async function insertUser(id, username, email, password, userType) {

    let res = await fetch(registerURL + `${id} ${username} ${email} ${password} ${userType}`, {
        method: 'GET'
    })
    const data = await res.json();
    console.log(data);
}




document.querySelector("#signIn").addEventListener("click", (e) => {
    e.preventDefault();

    checkUser(email.value, password.value);

})
document.querySelector("#createAccount").addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.querySelector("#Username").value;
    let email = document.querySelector("#Email").value;
    let password = document.querySelector("#Password").value;
    let userType;
    let freelancer = document.querySelector("#Freelancer");
    if (freelancer.checked)
        userType = 1;
    else
        userType = 2;
    id = Date.now() % 50000;
    insertUser(id, username, email, password, userType);
    window.location.href = "http://localhost:8383/home.html";

    //further processing
})
signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");

});