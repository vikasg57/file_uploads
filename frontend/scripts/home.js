let userdata = JSON.parse(localStorage.getItem("user"));
let user = document.querySelector("#welcome_user");
user.textContent = `Welocme ${userdata.user.first_name} `;

let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  uploadfile(event);
});

async function uploadfile(e) {
  e.preventDefault();
  let fileInput = document.querySelector("#myfile");
  let myHeaders = new Headers();
  let formdata = new FormData();
  formdata.append("file", fileInput.files[0]);

  if (!fileInput.files[0]) {
    alert("Please select file");
  } else {
    myHeaders.append("Authorization", `Bearer ${userdata.token}`);
    let response = await fetch("http://localhost:3500/file/docs", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    });
    let data = await response.json();
    localStorage.setItem("data", JSON.stringify(data));
    alert(`sucessful! your secret key is  ${data.key}`);
  }
}

let imgdiv = document.querySelector("#imgdiv");
let key = document.querySelector("#key");
let getdata = document.querySelector("#getdata");
getdata.addEventListener("click", function () {
  console.log(key);
  getdocs(key.value);
});

function getdocs(key) {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userdata.token}`);
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(`http://localhost:3500/file/docs/${key}`, requestOptions)
    .then((response) => response.json())
    .then((result) => showimages(result))
    .catch((error) => console.log("error", error));
}

function showimages(result) {
  let img = document.createElement("img");
  img.src = `data:image/jpeg;base64,${result.img.data}`;
  imgdiv.append(img);
}

function logout(){
    localStorage.removeItem("user");
}