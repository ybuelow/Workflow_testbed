import { after, before } from "lodash";
import {
  getMemorys,
  updateMemory,
  deleteMemory,
  createMemorys,
} from "../memory/memory.controller.js";
import { model as Memory } from "../memory/memory.model.js";
import e from "express";

jest.mock("../memory/memory.model.js");

const response = {
  status: jest.fn((x) => x),
  json: jest.fn((x) => x),
};

describe("Alle Memorys bekommen", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("Alle Memorys succesfully bekommen", async () => {
    const Memorys = [
      {
        _id: "65f04ed398269223506d8982",
        titel: "Ferien in Bali",
        text: "Hallo alle zusammen, hier ein Bild von meinen Ferien in Bali mit dem Van und meiner Freundin",
        bild: "",
      },
      {
        _id: "65f06e3298269223506d8983",
        titel: "Ferien in Ferien in Bali Update",
        text: "Hallo Hier ist ein weiteres Update von meinem tollen Urlaub in Bali. Ich genieße jede Minute! zusammen, hier ein Bild von meinen Ferien in Bali mit dem Van und meiner Freundin",
        bild: "",
        video: "",
      },
      {
        _id: "65f06e4698269223506d8984",
        titel: "Ferien in Bali Update zwei",
        text: "Bali ist wirklich ein Paradies! Hier ein kleiner Einblick in meinen Aufenthalt dort.",
        bild: "",
      },
    ];
    Memory.find.mockImplementation(() => {
      return {
        exec: jest.fn().mockResolvedValue(Memorys),
      };
    });
    await getMemorys(null, response);
    expect(response.json).toHaveBeenCalledWith(Memorys);
  });
  test("Fehler beim bekommen der Memorys", async () => {
    Memory.find.mockImplementation(() => {
      return {
        exec: jest.fn().mockRejectedValue({ message: "Fehler" }),
      };
    });
    await getMemorys(null, response);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: "Fehler" });
  });
});

describe("Memory erstellen", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("Memory erfolgreich erstellt", async () => {
    const req = {
      body: {
        titel: "Ferien in Bali",
        text: "Hallo alle zusammen, hier ein Bild von meinen Ferien in Bali mit dem Van und meiner Freundin",
        bild: "",
      },
    };
    const Memorytocreate = {
      titel: req.body.titel,
      text: req.body.text,
      bild: req.body.bild,
    };
    Memory.create.mockResolvedValue(Memorytocreate);
    await createMemorys(req, response);
    expect(response.json).toHaveBeenCalledWith(Memorytocreate);
  });
  test("Fehler beim erstellen des Memorys", async () => {
    const req = {
      body: {
        titel: "Ferien in Bali",
        text: "Hallo alle zusammen, hier ein Bild von meinen Ferien in Bali mit dem Van und meiner Freundin",
        bild: "",
      },
    };
    Memory.create.mockRejectedValue({
      message: "Fehler beim Erstellen des Memorys",
    });
    await createMemorys(req, response);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: "Fehler beim Erstellen des Memorys",
    });
  });
});
describe("Memory updaten", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  const request = {
    params: {
      id: "65f04ed398269223506d8982",
    },
    body: {
      titel: "Ferien in Bali",
      text: "Hallo alle zusammen, hier ein Bild von meinen Ferien in Bali mit dem Van und meiner Freundin",
      bild: "",
    },
  };
  test("Memory erfolgreich updaten", async () => {
    const MemorytoUpdate = {
      _id: request.params.id,
      titel: request.body.titel,
      text: request.body.text,
      bild: request.body.bild,
    };
    Memory.findById.mockImplementation(() => {
      return {
        exec: jest.fn().mockResolvedValue(MemorytoUpdate),
      };
    });
    await updateMemory(request, response);
    expect(MemorytoUpdate.titel).toBe(request.body.titel);
  });
  test("Memory nicht gefunden", async () => {
    Memory.findById.mockImplementation(() => {
      return {
        exec: jest
          .fn()
          .mockRejectedValue({ message: "Memory mit Id ${id} nicht gefunden" }),
      };
    });
    await updateMemory(request, response);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: "Memory mit Id ${id} nicht gefunden",
    });
  });
});
describe("Memory löschen", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  const request = {
    params: {
      id: "1",
    },
  };
  test("Memory erfolgreich löschen", async () => {
    const MemorytoDelete = {
      _id: "1",
      titel: "Ferien in Bali",
      text: "Hallo alle zusammen, hier ein Bild von meinen Ferien in Bali mit dem Van und meiner Freundin",
      bild: "",
    };
    Memory.findById.mockImplementation(() => {
      return {
        exec: jest.fn().mockResolvedValue(MemorytoDelete),
      };
    });
    await deleteMemory(request, response);
    expect(response.json).toHaveBeenCalledWith(MemorytoDelete);
  });
  test("Memory nicht gefunden", async () => {
    Memory.findById.mockImplementation(() => {
      return {
        exec: jest
          .fn()
          .mockRejectedValue({ message: "Memory mit Id ${id} nicht gefunden" }),
      };
    });
    await deleteMemory(request, response);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: "Memory mit Id ${id} nicht gefunden",
    });
  });
});
