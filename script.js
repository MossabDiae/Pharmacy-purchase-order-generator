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
            cells = row.getElementsByTagName("td")
            // put the innerHtml of each cell in the right place
            document.getElementById('code').value = cells[0].innerHTML
            document.getElementById('name').value = cells[1].innerHTML
            document.getElementById('uc').value = cells[2].innerHTML
            // disable the submit button
            toggleInput(document.querySelector("#item_input input[type=submit]"), 1)
            // activate quantity input for convenience
            document.getElementById('qte').focus()
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
        input.value = ""
        order_row.appendChild(cell)
    })
    // Add remove button
    rmbutton = document.createElement("button")
    rmbutton.classList.add('btn', 'btn-danger', 'btn-sm');
    rmbutton.innerHTML = "delete"

    order_row.appendChild(rmbutton)
    // add row to table's body
    order_table.appendChild(order_row)
    rmbutton.addEventListener('click', function (e) {
        e.target.parentElement.remove();
    })
}

function toggleInput(element, state) {
    switch (state) {
        case "disable":
        case "off":
        case "disabled":
        case 0:
            element.setAttribute("disabled", "");
            break;
        case "enable":
        case "enabled":
        case "on":
        case 1:
            element.removeAttribute("disabled");
            break;
    }
}

function activateTab(tab) {
    // make all tabs and their divs inactive
    tabs = document.querySelectorAll("button.nav-link")
    tabs.forEach((t) => {
        t.className = t.className.replace(" active", "");
        document.getElementById(t.dataset.target).style.display = "none";
    })
    // activate and show current tab's target
    tab.className = tab.className + " active";
    document.getElementById(tab.dataset.target).style.display = "block";
    
}

function generatePreview(tab) {
    // fill the placeholders
    document.getElementById('dateholder').innerHTML = document.getElementById('orderdate').value
    document.getElementById('ordernumholder').innerHTML = document.getElementById('ordernum').value
    document.getElementById('bnumholder').innerHTML = document.getElementById('bnum').value
    document.getElementById('snumholder').innerHTML = document.getElementById('snum').value
    document.getElementById('ortdertable-bodyholder').innerHTML = document.querySelector("#orderlist tbody").innerHTML
    // clean the table from remove buttons
    document.querySelectorAll('#ortdertable-bodyholder button').forEach((btn) => {
        btn.remove()
    })
    
    activateTab(tab);
}

document.addEventListener('DOMContentLoaded', function () {
    setupDom();
    RenderTable(document.getElementById("grselect"));
    document.querySelector('form').onsubmit = () => {
        addToOrderList();
        toggleInput(document.querySelector("#item_input input[type=submit]"), 0);
        return false;
    }

    // activate add submit only when there is name
    document.getElementById("name").oninput = function () {
        let addbtn = document.querySelector("#item_input input[type=submit]");
        if (this.value.length > 0) {
            toggleInput(addbtn, 1)
        } else {
            toggleInput(addbtn, 0)
        }
    }
    // activate Book&stub inputs when psy-drugs are active
    document.querySelector("#psydrugs input").onchange = function () {
        if (this.checked) {
            document.querySelectorAll("#bksb input").forEach((inp) => {
                toggleInput(inp, 1)
            })
            document.getElementById('psytitle').style.display = 'block'
        } else {
            document.querySelectorAll("#bksb input").forEach((inp) => {
                toggleInput(inp, 0)
        })
        document.getElementById('psytitle').style.display = 'none'
    }
    }
    // Get date and fill current date + copyright
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    var year = dateObj.getUTCFullYear();
    newdate = year + "/" + month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "/" + day;

    document.querySelectorAll('.year').forEach((elem) => {
        elem.innerHTML = year
    })
    document.getElementById('orderdate').value = newdate

})