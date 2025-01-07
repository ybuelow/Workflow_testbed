import { getLoggedInUser } from "../services/authentication.js";
import { init as initMemory } from "../pages/memoryspage.js";
import { init as initLogin } from "../pages/login.js";
import "../styles/styles.css";

getLoggedInUser()
  .then((user) => {
    console.log(user);
    if (!user) {
      console.log("User not logged in");
      return initLogin();
    }
    initMemory(user);
    console.log("User logged in");
  })
  .catch(() => initLogin());
