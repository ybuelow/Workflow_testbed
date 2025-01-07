import { model as User } from "../user/user.model.js";
import { hash } from "bcrypt";
import passport from "passport";

function handleError(error, response) {
  const status = error.status;
  if (status) {
    response.status(status);
  } else {
    response.status(500);
  }
  response.json({ message: error.message });
}

async function registerUser(req, response) {
  const username = req.body.username;
  console.log(username);
  const email = req.body.email;
  await User.findOne({ username: username })
    .exec()
    .then(async (user) => {
      if (user) {
        return Promise.reject({
          message: `User with username ${username} already exists.`,
          status: 409,
        });
      }
      await User.findOne({ email: username })
        .exec()
        .then(async (mail) => {
          if (mail) {
            return Promise.reject({
              message: `User with email ${email} already exists.`,
              status: 409,
            });
          }
        });
      const hashedPwd = await hash(req.body.password, 10);
      console.log(req.body.password, hashedPwd);
      return User.create({
        username: username,
        email: email,
        password: hashedPwd,
      }).then((user) => {
        response.json({
          _id: user._id,
          username: user.username,
          email: user.email,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function getUser(request, response) {
  const user = request.user;
  if (!user) {
    return response.json();
  }
  response.json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
}

function loginUser(request, response, next) {
  // User Authentisierung durchführen
  // - Aufruf der bei der Initialisierung von Passport definierten
  //   Authentisierungs-Methode (verify)
  // - Bei erfolgreicher Authentisierung wird Session erstellt
  //   und in DB gespeichert.
  passport.authenticate("local", function (error, user, info) {
    if (error) {
      // Fehler während Authentisierung
      // => Fehler weiterleiten
      return next(error);
    }
    if (!user) {
      // User konnte nicht authentisiert werden
      console.log(info);
      // Code Uauthorized (401) in Response zurückliefern
      return response.status(401).json({ message: "Authentication failed" });
    }
    // Authentisierung erfolgreich
    // User Session einrichten, damit Response Session Cookie
    // hinzugefügt wird. Dies geschieht über die Methode logIn,
    // welche Passport request Objekt hinzufügt.
    request.logIn(user, () => {
      response.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    });
  })(request, response, next);
}

function logoutUser(request, response, next) {
  // User von User Session lösen. Dies geschieht über die Methode logOut,
  // das Passport request Objekt für eingeloggte User hinzufügt.
  request.logOut((error) => {
    // Fehler bei Logout
    // => Fehler weiterleiten
    if (error) {
      console.log("Failed to logout");
      return next(error);
    }
    // Session löschen. Dies geschieht über das Property session, das
    // express-session request Objekt für eingeloggte User hinzufügt.
    // Das Property session ist ein Objekt, das für das löschen der
    // Session eine Methode destroy anbietet.
    request.session.destroy((error) => {
      if (error) {
        console.log("Failed to destroy session");
        return next(error);
      }
      // Sicherstellen, dass Cookie im Client gelöscht wird.
      response.clearCookie("connect.sid");
      response.json({ message: "Successfully logged out" });
    });
  });
}

export { registerUser, getUser, loginUser, logoutUser };
