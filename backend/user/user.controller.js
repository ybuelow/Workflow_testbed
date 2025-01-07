import { model as User } from "./user.model.js";

async function getUser(req, res) {
  await User.find()
    .exec()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500);
      res.json({ message: error.message });
    });
}

export { getUser };
