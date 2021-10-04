let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("button-el")
const ulEl = document.querySelector("#ul-id")
const buttonDel = document.querySelector("#button-delete")
const btnTab = document.querySelector("#tab-btn")
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

buttonDel.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

btnTab.addEventListener("click", function() {
    chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
        let boolTest = true
        for(let i = myLeads.length - 1; i >= 0; i--) {
        if(myLeads[i] === tabs[0].url) {
            boolTest = false
        }
    }
        if(boolTest) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
        }
    })
})

function render(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
        <a target='_blank' href='${leads[i]}'>${leads[i]} </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}

const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromStorage) {
    myLeads = leadsFromStorage
    render(myLeads)
}