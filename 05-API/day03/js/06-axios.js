import { BASE_URL } from "../../day01/assets/env.js";

// DOM Elements
const list = document.getElementById("list");
// const btnGetUsers = document.getElementById("btnGetUsers");
// const btnCreateUser = document.getElementById("btnCreateUser");
// const btnUpdateUser = document.getElementById("btnUpdateUser");
const usernameEl = document.getElementById("username");
const userIdEl = document.getElementById("userId");
const btnContainer = document.getElementById("btnContainer");

let timeoutId;
let lastDeletedUser;
const undoEl = document.createElement("button");

// Events
btnContainer.addEventListener("click", (e) => {
  console.log(e.target);
  const userId = userIdEl.value;
  const username = usernameEl.value;

  clearTimeout(timeoutId);

  if (e.target.id === "btnGetUsers") {
    fetchUsers();
  } else if (e.target.id === "btnCreateUser") {
    createUser();
  } else if (e.target.id === "btnUpdateUser") {
    updateUser(userId, username);
  } else if (e.target.id === "btnDeleteUser") {
    undoEl.innerText = "UNDO";
    btnContainer.appendChild(undoEl);
    // timeoutId = setTimeout(() => {
    deleteUser(userId);
    // undoEl.remove();
    // }, 3000);
  }
});

undoEl.addEventListener("click", () => {
  // clearTimeout(timeoutId);
  retrieveDeletedUser(lastDeletedUser);
  undoEl.remove();
});

// btnGetUsers.addEventListener("click", () => {
//   fetchUsers();
// });

// btnCreateUser.addEventListener("click", () => {
//   createUser();
// });

// btnUpdateUser.addEventListener("click", () => {
//   const userId = userIdEl.value;
//   const username = usernameEl.value;

//   updateUser(userId, username);
// });

// Functions
const fetchUsers = async () => {
  // fetch(`${BASE_URL}/users`, {method: "GET"} )
  // .then(res => res.json())
  // .then(data => {
  //     console.log(data);

  //     renderUsers(data);

  // })

  //   const response = await fetch(`${BASE_URL}/users`, { method: "GET" });
  //   const data = await response.json();
  //   //   console.log(data);
  //   renderUsers(data);

  axios
    .get(`${BASE_URL}/user`)
    .then((res) => {
      console.log(res);
      renderUsers(res.data);
    })
    .catch((err) => console.log(err));
};

fetchUsers();

const renderUsers = (users) => {
  list.innerHTML = "";

  // Validation
  if (!users || users.length === 0 || users === "Not found") {
    return (list.innerHTML = "<li>No users found</li>");
  }

  users.forEach((user) => {
    list.innerHTML += `
        <li>
        <img src=${user?.avatar} alt=${user.username}/>
        <h2> ${user.username} </h2>
        <h3> ${user.firstName} ${user.lastName} </h3>
        </li>
        `;
  });
};

const createUser = async () => {
  const payload = {
    username: "Batch332",
    firstName: "Kemal",
    lastName: "Ergorun",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQum62NWJbpa3uqr6ozh7yZxE_sM2prsZCsVg&s",
    id: "101",
  };

  // fetch(`${BASE_URL}/users`, {
  //     method: "POST",
  //     headers: {
  //         "Content-Type":"application/json"
  //     },
  //     body: JSON.stringify(payload)
  // }).then(res => res.json())
  // .then(data => {
  //     console.log(data);
  //     fetchUsers();
  // }).catch(err => console.log(err))

  //   const response = await fetch(`${BASE_URL}/users`, {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });

  //   const data = await response.json();
  //   //   console.log(data);
  //   fetchUsers();

  axios.post( `${BASE_URL}/users` , payload).then(res => {
    console.log(res);
    fetchUsers();
  }).catch(err => console.log(err.message));

};

const updateUser = async (userId, username) => {
  const payload = {
    username,
    avatar: "https://picsum.photos/200",
  };

  //   fetch(`${BASE_URL}/users/${userId}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   }).then(res => res.json()).then((data) => {
  //     console.log(data);
  //     fetchUsers();
  //   }).catch(err => console.log(err));

  //   const response = await fetch(`${BASE_URL}/users/${userId}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   });

  //   const data = await response.json();

  //   console.log(data);
  //   fetchUsers();

  axios.put(`${BASE_URL}/users/${userId}`, payload).then(res =>{ console.log(res);
    fetchUsers()
    return res.data
  } ).catch(err => console.log(err.message))

};

const deleteUser = async (userId) => {
  // fetch(`${BASE_URL}/users/${userId}`, {
  //   method: "DELETE",
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //     fetchUsers();
  //   });
  //   const response = await fetch(`${BASE_URL}/users/${userId}`, {
  //     method: "DELETE",
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   lastDeletedUser = data;
  //   fetchUsers();

  axios.delete(`${BASE_URL}/users/${userId}`).then((res) => {
    console.log(res);
    fetchUsers();
  }).catch((err) => console.log(err.message))

};

const retrieveDeletedUser = async ({
  username,
  firstName,
  lastName,
  avatar,
  id,
}) => {
  const payload = { username, firstName, lastName, avatar, id };

  // fetch(`${BASE_URL}/users`, {
  //     method: "POST",
  //     headers: {
  //         "Content-Type":"application/json"
  //     },
  //     body: JSON.stringify(payload)
  // }).then(res => res.json())
  // .then(data => {
  //     console.log(data);
  //     fetchUsers();
  // }).catch(err => console.log(err))

  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  //   console.log(data);
  fetchUsers();
};