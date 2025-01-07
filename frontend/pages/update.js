import { update } from "../services/memoryserv.js";
import { logout as logoutUser } from "../services/authentication.js";
import { init } from "./memoryspage.js";
import { init as initLogin } from "./login.js";

async function updateMemory(user, memory) {
  document.head.innerHTML = `
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      #header {
        background-color: #333;
        color: #fff;
        padding: 20px;
        text-align: center;
      }

      .form {
        width: 50%;
        margin: 50px auto;
      }

      label {
        font-weight: bold;
      }

      #updatetitel,
      #updatetext,
      #updatebild {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
      #logout,
      #home,
      #updatesubmit {
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      #logout,
      #home,
      #updatesubmit:hover {
        background-color: #45a049;
      }
      #logout,
      #home{
        display:flex;
        justify-content: center;  
        width: 50%;
        margin: 50px auto;
      }
    </style>
  `;
  const ID_HEADER = "header_id";
  document.body.innerHTML = `
    <header id=${ID_HEADER}>
    </header>
    <div class="logout-div">
      <button id="logout" class="btnLogout">Logout</button>
    </div>
    <div class="home">
      <button id="home" class="btnHome">Home</button>
    </div>
    <div class="form">
      <form id="form">
        <label for="titel">Titel:</label><br>
        <input type="text" id="updatetitel" name="titel" value="${memory.titel}"><br>
        <label for="text">Text:</label><br>
        <textarea id="updatetext" name="text">${memory.beschreibung}</textarea><br>
        <input type="file" id="updatebild" name="bild" value="${memory.bild}"><br>
        <button type="submit" id="updatesubmit">Submit</button>
      </form>
    </div>
  `;
  const logoutbtn = document.getElementById("logout");
  logoutbtn.addEventListener("click", logout);
  const homebtn = document.getElementById("home");
  homebtn.addEventListener("click", () => init(user));
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const titel = document.getElementById("updatetitel").value;
    const beschreibung = document.getElementById("updatetext").value;
    const bild = memory.bild;
    const Video = memory.Video;
    const listOfPeople = memory.grantedPeople;
    const updated = {
      titel: titel,
      beschreibung: beschreibung,
      bild: bild,
      Video: Video,
      grantedPeople: listOfPeople,
      creator: user._id,
    };
    update(memory._id, updated).then(() => init(user));
  });
  async function logout() {
    await logoutUser().then(() => initLogin());
  }
}

export { updateMemory };
