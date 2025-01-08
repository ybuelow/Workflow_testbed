import axios from "axios"

// Definition genereller Arrays/Variabeln
let dataforCity = []
let dataforDidok = []

// Funktion zum holen der Daten von der Api mit dem Paramet Stadt
export async function searchForDistrict(city) {
  const url= `https://sbb.opendatasoft.com/api/explore/v2.1/catalog/datasets/dienststellen-gemass-opentransportdataswiss/records?where=localityname%3A%22${city}%22&limit=100&refine=isocountrycode%3A%22CH%22`
    await axios.get(url)
    .then((res) =>{
        dataforCity = [];
        for(let e = 0; e < res.data.results.length; e++){
            dataforCity.push(res.data.results[e])
        }
    })
return Promise.resolve(dataforCity)
}

// Funktion zum Daten suchen mit der Didok Nummer
export async function searchForDidok(didok) {
const URL=    `https://sbb.opendatasoft.com/api/explore/v2.1/catalog/datasets/dienststellen-gemass-opentransportdataswiss/records?where=numbershort%3A%20${didok}&limit=1&refine=isocountrycode%3A%22CH%22`
    await axios.get(URL)
    .then((res) =>{
        dataforDidok = []
        for(let e = 0; e< res.data.results.length; e++){
            dataforDidok.push(res.data.results[e])
        }
    })
    return Promise.resolve(dataforDidok)
}
