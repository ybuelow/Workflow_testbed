import {searchForDistrict, searchForDidok } from "../model/model.js"

// Asynchrone Funktion zum holden der Daten mit City als Parameter
async function searchForCity(req, res) {
    const city = req.params.id;
    const result = await searchForDistrict(city)
    res.json(result)
}

// Asynchrone Funktion zum holden der Daten mit der Didok als Parameter
async function searchWithDidok(rep, res) {
    const didok = rep.params.didok
    const result = await searchForDidok(didok)
    res.json(result)
}

export { searchForCity, searchWithDidok}