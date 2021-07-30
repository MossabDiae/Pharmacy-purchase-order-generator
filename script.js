function makeRow(rowdict){
    // take a dictionary and return a table row
    let row  = document.createElement("tr")
    for (let key in rowdict){
        let cell = document.createElement("td")
        cell.innerHTML = rowdict[key]
        row.appendChild(cell)
    }
    return row
}


document.addEventListener('DOMContentLoaded', function() {
    let table = document.querySelector("#mdtable")
    data.dentaire.forEach(element => {
        table.appendChild(makeRow(element))
    });
})
