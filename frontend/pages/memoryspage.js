import { getGrantedMemories, getMy, remove } from "../services/memoryserv.js";
import { logout as logoutUser } from "../services/authentication.js";
import { init as initLogin } from "./login.js";
import { createMemorie } from "./erstellen.js";
import { updateMemory } from "./update.js";

async function init(loginUser) {
  const ID_HEADER = "header";
  const ID_TODO_SECTIONS = "todo-sections";
  const id = loginUser._id;
  const memories = await getMy(id);
  const grantedMemories = await getGrantedMemories(id);
  for (let e = 0; e < memories.length; e++) {
    if (memories[e].creator === loginUser._id) {
    }
  }
  document.body.innerHTML = `
    <header id=${ID_HEADER}></header>
    <div >
      <div id=${ID_TODO_SECTIONS}></div>
    </div>
      <button id="logout" class="btnLogout">Logout</button>
      <button id="erstellen" class="btnErstellen">Erstellen</button>
      <button id="myMemories" class="btnMeine">Meine Memories</button>
      <button id="grantedMemories" class="btnGranted">Granted Memories</button>
      <div id="memories">
      </div>
      
    `;
  const logoutbtn = document.getElementById("logout");
  logoutbtn.addEventListener("click", logout);
  const erstellenbtn = document.getElementById("erstellen");
  erstellenbtn.addEventListener("click", () => createMemorie(loginUser));
  const myMemoriesbtn = document.getElementById("myMemories");
  myMemoriesbtn.addEventListener("click", () => showMyMemories(loginUser));
  const grantedMemoriesbtn = document.getElementById("grantedMemories");
  grantedMemoriesbtn.addEventListener("click", () =>
    showGrantedMemories(loginUser)
  );
  await showMyMemories(loginUser);
}
async function logout() {
  await logoutUser().then(() => initLogin());
}
async function showMyMemories(loginUser) {
  const memories = await getMy(loginUser._id);
  const memorysDiv = document.getElementById("memories");
  memorysDiv.innerHTML = `
  <style>
  #memorys {
    border: 2px solid #000; /* Black border with 2px width */
    padding: 20px; /* Add some padding for better spacing */
  }

  #memorys h1 {
    margin-bottom: 10px; /* Add some space below the heading */
  }

  #memorys ul {
    list-style: none; /* Remove bullet points from the list */
    padding: 0; /* Remove default padding */
  }

  #memorys li {
    margin-bottom: 20px; /* Add space between list items */
  }
</style>
<div id="memorys">
  <h1>Meine Memories</h1>
  ${memories
    .map((memory) => {
      const memoryId = memory._id;
      let imageTag = "";
      if (memory.bild) {
        const imageType = memory.bild.startsWith("/9j/") ? "jpeg" : "png";
        imageTag = `<img src="data:image/${imageType};base64, ${memory.bild}" alt="memoryimage">`;
      }
      return `
      <div class="memory-item">
        <h2>Titel: ${memory.titel}</h2>
        <p>Beschreibung: ${memory.beschreibung}</p>
        ${imageTag}
        <button class="btnDelete">Delete</button>
        <button class="btnUpdate">Update</button>
      </div>`;
    })
    .join("")}
</div>
    `;
  const deleteButtons = document.getElementsByClassName("btnDelete");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", async () => {
      const memoryId = memories[i]._id;
      await remove(memoryId);
      showMyMemories(loginUser);
    });
  }
  const updateButtons = document.getElementsByClassName("btnUpdate");
  for (let i = 0; i < updateButtons.length; i++) {
    updateButtons[i].addEventListener("click", async () => {
      const memoryId = memories[i]._id;
      console.log("Update memory with id:", memoryId);
      updateMemory(loginUser, memories[i]);
    });
  }
}
async function showGrantedMemories(loginUser) {
  const memories = await getGrantedMemories(loginUser._id);
  const memorysDiv = document.getElementById("memories");
  memorysDiv.innerHTML = `
  <style>
  #memorys {
    border: 2px solid #000; /* Black border with 2px width */
    padding: 20px; /* Add some padding for better spacing */
  }

  #memorys h1 {
    margin-bottom: 10px; /* Add some space below the heading */
  }

  #memorys ul {
    list-style: none; /* Remove bullet points from the list */
    padding: 0; /* Remove default padding */
  }

  #memorys li {
    margin-bottom: 20px; /* Add space between list items */
  }
</style>
      <div id="memorys">
      <h1>Granted Memories</h1>
      <ul>
      ${memories
        .map((memory) => {
          let imageTag = "";
          if (memory.bild) {
            imageTag = `<img src="data:image/png;base64, ${memory.bild}" alt="memoryimage">`;
          }
          return `
            <li>
              <h2>Titel: ${memory.titel}</h2>
              <p>Beschreibung: ${memory.beschreibung}</p>
              ${imageTag}
            </li>`;
        })
        .join("")}
      </div>
    `;
}
export { init };
