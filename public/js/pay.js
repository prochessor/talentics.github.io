document.querySelector("#pay").addEventListener("click", async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8383/payment");
    let data = await result.json();
    console.log(data);
    window.location.href = "http://localhost:8383/home.html"
})


