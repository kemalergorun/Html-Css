import{DUMMY_JSON_BASE_URL}from"../../day01/assets/env.js";
// DOM ELEMENTS
const formElement = document.getElementById("loginForm");
const outputElement = document.getElementById("output");

// EVENT
formElement.addEventListener("submit", (event) => {
  // To prevent page to refresh
  event.preventDefault();

  // Accessing Elements
  //   console.log(event.target.username.value);
  //   console.log(event.target.password.value);
  const username = event.target.username.value;
  const password = event.target.password.value;

  // Validations
  if (!username.trim() || !password) {
    populateOutput(false);
    return;
  }

  login({ username, password });
});

// FUNCTIONS
async function login({ username, password }) {
  try {
    const response = await fetch(`${DUMMY_JSON_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    const data = await response.json();

    console.log(data);
    localStorage.setItem("login_token", data?.accessToken);

    populateOutput(true, `${data?.firstName} ${data?.lastName}`);
  } catch (error) {
    console.log(error);
    populateOutput(false);
  }
}

function populateOutput(isPositive, welcomeName) {
  if (isPositive) {
    outputElement.innerHTML = "";
    outputElement.setAttribute("class", "alert alert-success text-center");
    outputElement.innerText = `Login Successful! Welcome ${welcomeName}`;
    formElement.reset();
  } else {
    outputElement.innerHTML = "";
    outputElement.setAttribute("class", "alert alert-danger text-center");
    outputElement.innerText = "Invalid Credentials";
    formElement.reset();
  }
}
