import express from "express"
import cors from "cors"
import { router as alleRout } from "./routes/routes.js";


// erstellen es Server
const app = express()
app.use(express.json())
app.use(cors());


// router definiert
app.use("/entrys", alleRout)


//Port
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });