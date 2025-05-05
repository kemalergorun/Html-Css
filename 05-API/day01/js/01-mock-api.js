import { BASE_URL } from "../assets/env.js";

const ulEl = document.getElementById("users-content");

// FETCHING

const fetchUsers = () => {
  fetch(`${BASE_URL}/users`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      renderUsers(data);
    })
    .catch((err) => console.log(err));
};

const renderUsers = (users) => {
  if (!Array.isArray(users)) {
    ulEl.innerText = "Fetching problem...";
    return;
  }

  users.forEach((user) => {
    ulEl.innerHTML += `
        <li>
            <img src=${user.avatar} width="100px" alt=${user.firstName} />
            <h3> ${user.username} </h3>
        </li>
        `;
  });
};

fetchUsers();
