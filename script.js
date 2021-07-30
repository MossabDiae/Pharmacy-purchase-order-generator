// tablse html will hold generated rows for each mdts group
// this will avoid regenerating them each time
let tables_html = []

function setupDom(){
    // adding select options for groups
    for (let group in data){
        let opt = document.createElement("option")
        opt.innerHTML = group
        document.querySelector("#grselect").appendChild(opt)
    }
}

function RenderTable(select){
    // Clean table , check if new value is already generated
    // if not generate it , finaly display it
    // console.log(select.value)
    if (tables_html[select.value]) {
        
    }

}

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
    setupDom();
    let table_body = document.createElement("tbody")
    data.dentaire.forEach(element => {
        table_body.appendChild(makeRow(element))
    });
    document.querySelector("#mdtable").appendChild(table_body)
})
