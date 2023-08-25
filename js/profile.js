'use strict'
let mainHeading = document.querySelector("#id_pro_id");
let cardNamePrimary = document.querySelector("#nam_ki_id");
let categoryName = document.querySelector("#kia_ha_ye");
let hireBtn = document.querySelector("#hire");
let msgBtn = document.querySelector("#msgFreelancer");
let firstName = document.querySelector("#bcha_ka_nam");
let username = document.querySelector("#user_ka_nam");
let categoryNamePrimary = document.querySelector("#konsi_category_ka");
let country = document.querySelector("#konsa_mulk_ha");
let lastName = document.querySelector("#akhir_se_kia_nam");
let email = document.querySelector("#email_btao");
let phone = document.querySelector("#phone_btao");
let exp = document.querySelector("#tajurba");
let descriptionText = document.querySelector("#apna_bara_me_btao");
let resumeBtn = document.querySelector("#getResume");
let portfolioBtn = document.querySelector("#getPortfolio");
let cardDate = document.querySelector("#tareekh");
let cardName = document.querySelector("#konsa_tha");
let cardCategory = document.querySelector("#nasal");
let cardDetail = document.querySelector("#detailein");
let cardEarning = document.querySelector("#kitni_kmai_hoi");

let url = "http://localhost:8383/profile";

let userInformation;
document.addEventListener("DOMContentLoaded", async () => {
    let result = await fetch(url);
    userInformation = await result.json();

    initProfile(userInformation.profile[0]);
})


function initProfile(info) {
    console.log(info);
    mainHeading.textContent = " " + info.username;
    cardNamePrimary.textContent = info.fName + " " + info.lName;
    categoryName.textContent = info.categoryName;
    firstName.textContent = info.fName;
    username.textContent = info.username;
    categoryNamePrimary.textContent = info.categoryName
    country.textContent = info.country
    lastName.textContent = info.lName
    email.textContent = info.email
    phone.textContent = info.phone
    exp.textContent = info.experience
    descriptionText.textContent = info.descriptionText
    // cardDate
    // cardName
    // cardCategory
    // cardDetail
    // cardEarning
}
