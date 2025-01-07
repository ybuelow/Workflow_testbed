import { model as Memory } from "./memory.model.js";

async function getMemorys(req, res) {
  await Memory.find()
    .exec()
    .then((memorys) => {
      res.json(memorys);
    })
    .catch((error) => {
      res.status(500);
      res.json({ message: error.message });
    });
}

async function getMyMemories(req, res) {
  const id = req.params.id;
  await Memory.find({ creator: id })
    .exec()
    .then((memorys) => {
      res.json(memorys);
    })
    .catch((error) => {
      res.status(500);
      res.json({ message: error.message });
    });
}

async function getGrantedMemories(req, res) {
  const id = req.params.id;
  await Memory.find({ grantedPeople: id })
    .exec()
    .then((memorys) => {
      res.json(memorys);
    })
    .catch((error) => {
      res.status(500);
      res.json({ message: error.message });
    });
}

async function createMemorys(req, res) {
  console.log(req.body);
  let memoryData = {
    titel: req.body.titel,
    beschreibung: req.body.beschreibung,
    bild: req.body.bild,
    Video: req.body.Video,
    grantedPeople: req.body.grantedPeople,
    creator: req.body.creator,
  };

  console.log(memoryData);
  await Memory.create(memoryData)
    .then((memory) => {
      res.json(memory);
    })
    .catch((error) => {
      res.status(500);
      res.json({ message: error.message });
    });
}

async function updateMemory(req, res) {
  const id = req.params.id;
  console.log(req.body);
  console.log(id);
  await Memory.findById(id)
    .exec()
    .then((memory) => {
      if (!memory) {
        return Promise.reject({
          status: 404,
          message: "Memory mit Id ${id} nicht gefunden",
        });
      }
      memory.titel = req.body.titel;
      memory.beschreibung = req.body.beschreibung;
      if (req.body.bild) {
        memory.bild = req.body.bild;
      }
      if (req.body.video) {
        memory.Video = req.body.video;
      }
      return memory.save();
    })
    .then((savedMemory) => {
      res.json(savedMemory);
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status);
      } else {
        res.status(500), res.json({ message: error.message });
      }
      res.json({ message: error.message });
    });
}

async function deleteMemory(req, res) {
  const id = req.params.id;
  await Memory.findById(id)
    .exec()
    .then((memoryfound) => {
      if (!memoryfound) {
        return Promise.reject({
          message: `Memory with id ${id} not found.`,
          status: 404,
        });
      }
      return memoryfound.deleteOne();
    })
    .then((deleted) => {
      res.json(deleted);
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status);
      } else {
        res.status(500);
      }
      res.json({ message: error.message });
    });
}

export {
  getGrantedMemories,
  getMyMemories,
  createMemorys,
  updateMemory,
  deleteMemory,
};
