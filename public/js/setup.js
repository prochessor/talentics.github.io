let saveBtn = document.querySelector("#save_changes_wala_button");
let firstName = document.querySelector("#input_firstname_input");
let lastName = document.querySelector("#input_lastname_input");
let phone = document.querySelector("#input_phone_input");
let country = document.querySelector("#input_country_input");
let urlUser = document.querySelector("#input_url_input");
let exp = document.querySelector("#input_yearofexp_input");
let webDev = document.querySelector("#input_webdeveloper_input");
let videoEditor = document.querySelector("#input_videoeditor_input");
let contentWriter = document.querySelector("#input_contentwriter_input");
let gameDeveloper = document.querySelector("#input_gamedeveloper_input");
let graphicDesigner = document.querySelector("#input_graphicsdesigner_input");
let digitalMarketer = document.querySelector("#input_digitalmarketing_input");
let photographer = document.querySelector("#id_photography_id");
let descriptionText = document.querySelector("#comment");


let userInfo = [
    firstName,
    lastName,
    phone,
    country,
    urlUser,
    exp,
    descriptionText
]

saveBtn.addEventListener("click", async () => {
    let URL = "http://localhost:8383/updateSetup/";
    userInfo.forEach((info) => {
        URL += (info.value + "^");
    })
    var radioButtons = document.querySelectorAll('input[name="category"]');

    var checkedRadioButtonValue = null;

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            checkedRadioButtonValue = radioButtons[i].value;
            break;
        }
    }

    URL += checkedRadioButtonValue;
    console.log(URL);
    let result = await fetch(URL);
    let data = await result.json();
    console.log(data);
})




// let simba1 = document.querySelector("#save_changes_wala_button");
// let simba2 = document.querySelector("#input_firstname_input");
// let simba3 = document.querySelector("#input_lastname_input");
// let simba4 = document.querySelector("#input_phone_input");
// let simba5 = document.querySelector("#input_country_input");
// let simba6 = document.querySelector("#input_url_input");
// let simba7 = document.querySelector("#input_yearofexp_input");
// let simba8 = document.querySelector("#input_username_input");
// let simba9 = document.querySelector("#input_email_input");
// let simba10 = document.querySelector("#input_password_input");
// let simba11 = document.querySelector("#input_confirmpassword_input");
// let simba12 = document.querySelector("#input_webdeveloper_input");
// let simba13 = document.querySelector("#input_videoeditor_input");
// let simba14 = document.querySelector("#input_contentwriter_input");
// let simba15 = document.querySelector("#input_gamedeveloper_input");
// let simba16 = document.querySelector("#input_graphicsdesigner_input");
// let simba17 = document.querySelector("#input_digitalmarketing_input");
// let simba18 = document.querySelector("#id_photography_id");
