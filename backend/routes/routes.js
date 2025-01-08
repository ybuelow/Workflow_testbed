import {Router } from "express"

import {searchForCity, searchWithDidok} from "../controller/controller.js"

const router = Router()



router.get("/:id", searchForCity)
router.get("/didok/:didok", searchWithDidok)

export {router}
