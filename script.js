// tablse html will hold generated rows for each mdts group
// this will avoid regenerating them each time
let tables_html = []

// collect choices based on 
// let choices = []

function setupDom() {
    // adding select options for groups
    for (let group in data) {
        let opt = document.createElement("option")
        opt.innerHTML = group
        document.querySelector("#grselect").appendChild(opt)
    }
}

function RenderTable(select) {
    // Check if new value is already generated
    // if not generate it , finaly replace it
    // console.log(select.value)
    let grp_name = select.value
    old_tbody = document.querySelector("#mdtable tbody")
    if (tables_html[grp_name]) {
        // if group already generated and found just show it
        old_tbody.parentNode.replaceChild(tables_html[grp_name], old_tbody);
    } else {
        // value not found, generate it ,store it , display it
        let table_body = document.createElement("tbody")
        data[grp_name].forEach(element => {
            table_body.appendChild(makeRow(element))
        });
        tables_html[grp_name] = table_body;
        old_tbody.parentNode.replaceChild(table_body, old_tbody);
    }
    addRowHandlers()

}

function makeRow(rowdict) {
    // take a dictionary and return a table row
    let row = document.createElement("tr")
    for (let key in rowdict) {
        let cell = document.createElement("td")
        cell.innerHTML = rowdict[key]
        row.appendChild(cell)
    }
    return row
}

function addRowHandlers() {
    rows = document.querySelectorAll("#mdtable > tbody > tr")
    rows.forEach((row) => {
        row.onclick = () => {
            console.log("clicked !")
            cells = row.getElementsByTagName("td")
            // put the innerHtml of each cell in the right place
            document.getElementById('code').value = cells[0].innerHTML
            document.getElementById('name').value = cells[1].innerHTML
            document.getElementById('uc').value = cells[2].innerHTML    
        }
    })
}

function addToOrderList() {
    order_table = document.querySelector("#orderlist tbody")
    // prepare a row
    order_row = document.createElement("tr")
    // get current form state
    form = document.querySelectorAll(".namelab > input")
    // loop through form inputs and add them to row
    form.forEach((input) => {
        cell = document.createElement("td")
        cell.innerHTML = input.value
        order_row.appendChild(cell)
    })
    // add row to table's body
    order_table.appendChild(order_row)
}

document.addEventListener('DOMContentLoaded', function () {
    setupDom();
    document.querySelector('form').onsubmit = () => {
        addToOrderList();
        return false;
    }
})