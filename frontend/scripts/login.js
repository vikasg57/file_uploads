let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  login(event);
});

async function login(e) {
  e.preventDefault();
  try {
    var user = {
      email: form.email_login.value,
      password: form.password_login.value,
    };
    user = JSON.stringify(user);

    let api = `http://localhost:3500/login`;

    let response = await fetch(api, {
      method: "POST",
      body: user,
      headers: {
        "Content-Type": "application/json",
      },
    });

    var data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    if (data.user) {
      alert("sign up sucessful");
      window.location.href = "home.html";
    } else {
      alert(data.error);
    }
  } catch (er) {
    alert("Incorrect Credentials");
  }
}
