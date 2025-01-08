import express from "express"
import cors from "cors"
import { router as alleRout } from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// erstellen es Server
const app = express()
app.use(express.json())
app.use(cors());
app.use("/entrys", alleRout)


// router definiert
app.use(express.static('dist/first-project'));

// Catch-all route to serve index.html for Angular routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/first-project/index.html'));
});


//Port
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });