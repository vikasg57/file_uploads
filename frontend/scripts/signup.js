let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  signup(event);
});

async function signup(e) {
  try {
    e.preventDefault();
    var register_data = {
      first_name: form.name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      username: form.username.value,
      password: form.password.value,
      mobile: form.mobile.value,
    };
    register_data = JSON.stringify(register_data);
  } catch (er) {
    console.log(er);
  }

  try {
    let api = `http://localhost:3500/register`;
    let response = await fetch(api, {
      method: "POST",
      body: register_data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    signuponpage(data);
  } catch (er) {
    console.log(er);
  }
}

function signuponpage(el) {
  let { message } = el;
  if (message) {
    alert(message);
  } else if (el.user) {
    alert("sign up sucessful");
    window.location.href = "login.html";
  }
}
