import { register as registerUser } from "../services/authentication.js";
//import { CLASS_DO_NOT_DISPLAY } from "../utils/classesForStyling.js";
//import { displayError } from "../utils/elementsUtil.js";
import { init as initLogin } from "./login.js";

const ID_FORM = "form-register";
const ID_EMAIL = "e-mail";
const ID_USERNAME = "username";
const ID_PASSWORD = "password";
const ID_SUBMIT = "submit";
const ID_TO_LOGIN = "to-login";
const ID_FAILED_REGISTER = "register-failed";

function init() {
  document.body.innerHTML = `<div class="container-form">
        <h1 id="registerhone">Registrieren</h1>
        <form class="form" id="${ID_FORM}">
          <label class="small-font" for="${ID_EMAIL}">Email</label>
          <br />
          <input 
            type="email"
            class="fit-container"
            name="email"
            id="${ID_EMAIL}" 
          />
          <br />
          <label class="small-font" for="${ID_USERNAME}">username</label>
          <br />
          <input 
            type="text"
            class="fit-container"
            name="username"
            id="${ID_USERNAME}" 
          />
          <br />
          <label class="small-font" for="${ID_PASSWORD}">Password</label>
          <br />
          <input
            type="password"
            class="fit-container"
            name="password"
            id="${ID_PASSWORD}"
            autocomplete="new-password"
          />
          <br />
          <input 
            type="submit"
            class="btn fit-container"
            id="${ID_SUBMIT}"
            value="Registrieren"
          />
        <p id="${ID_FAILED_REGISTER}" class="error"></p>
        </form>
        <button 
          id="${ID_TO_LOGIN}"
          class="link small-font center fit-container"
        >
            Schon ein Account? Zum Login.
        </button>
    </div>`;
  const elToLogin = document.getElementById(ID_TO_LOGIN);
  elToLogin.addEventListener("click", initLogin);
  const elRegister = document.getElementById(ID_SUBMIT);
  elRegister.addEventListener("click", (event) => {
    event.preventDefault();
    register(
      document.getElementById(ID_EMAIL).value,
      document.getElementById(ID_USERNAME).value,
      document.getElementById(ID_PASSWORD).value
    );
  });
}

async function register(email, username, password) {
  const elError = document.getElementById(ID_FAILED_REGISTER);
  console.log(email, username, password);
  if (email && username && password) {
    await registerUser({ email, username, password })
      .then((res) => {
        console.log(res);
        initLogin();
      })
      .catch(() => displayError("Registrierung fehlgeschlagen"), elError);
  } else {
    console.log("Angaben fehlen", elError);
  }
}

export { init };
