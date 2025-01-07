import { getAll as getUsers } from "../services/userservices.js";
import { create } from "../services/memoryserv.js";
import { logout as logoutUser } from "../services/authentication.js";
import { init as loadHome } from "./memoryspage.js";
import { init as initLogin } from "./login.js";

async function createMemorie(user) {
  const id = user._id;
  const ID_HEADER = "header_id";
  const ID_TODO_SECTIONS = "todo_sections_id";
  document.body.innerHTML = `
    <header id=${ID_HEADER}></header>
    <div>
      <div id=${ID_TODO_SECTIONS}></div>
    </div>
    <div class="logout-div">
      <button id="createlogout" class="createBtnLogout">Logout</button>
    </div>
    <div class="home">
      <button id="createhome" class="createBtnHome">Home</button>
    </div>
    <div class="form">
      <form id="form">
        <label for="titel">Titel:</label><br>
        <input type="text" id="createtitel" name="titel"><br>
        <label for="text">Text:</label><br>
        <textarea id="createtext" name="createtext"></textarea><br>
        <label for="bild">Bild:</label><br>
        <input type="file" id="createbild" name="bild"><br>
        <label for="video">Video:</label><br>
        <input type="file" id="createvideo" name="video"><br>
        <label for="listOfPeople">Freigabe:</label><br>
        <select id="listOfPeople" multiple></select><br> 
        <button type="submit" id="createsubmit">Submit</button>
      </form>
    </div>
    <div id="allUsers"></div>
  `;
  const logoutbtn = document.getElementById("createlogout");
  logoutbtn.addEventListener("click", logout);
  const homebtn = document.getElementById("createhome");
  homebtn.addEventListener("click", () => loadHome(user));
  const imageInput = document.getElementById("createbild");
  imageInput.addEventListener("change", convertToBase64);
  let base64String = "";
  function convertToBase64() {
    const fileInput = document.getElementById("createbild");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      base64String = reader.result.split(",")[1];
    };

    reader.onerror = function (error) {
      console.error("Error converting file to Base64:", error);
    };
  }
  console.log(base64String);

  const select = document.getElementById("listOfPeople");
  const addButton = document.createElement("button");
  addButton.textContent = "Add";
  select.parentNode.insertBefore(addButton, select.nextSibling);

  let grantedPeople = [];

  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedOption = select.selectedOptions[0];
    if (selectedOption) {
      const selectedUserId = selectedOption.value;
      if (!grantedPeople.includes(selectedUserId)) {
        grantedPeople.push(selectedUserId);
        console.log("User added to grantedPeople:", selectedUserId);
      } else {
        console.log("User already exists in grantedPeople:", selectedUserId);
      }
    } else {
      console.log("No user selected.");
    }
  });
  document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const submitBtn = document.getElementById("createsubmit");
  submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const titel = document.getElementById("createtitel").value;
    const beschreibung = document.getElementById("createtext").value;
    const video = document.getElementById("createvideo").value;

    const newMemory = {
      titel,
      beschreibung,
      bild: base64String,
      Video: video,
      grantedPeople,
      creator: id,
    };
    console.log("New memory:", newMemory);

    try {
      const response = await create(newMemory);
      console.log("Memory created:", response);
    } catch (error) {
      console.error("Error creating memory:", error);
    }
  });

  try {
    const users = await getUsers();
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user._id;
      option.textContent = user.username;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  async function logout() {
    await logoutUser().then(() => initLogin());
  }
}

export { createMemorie };
