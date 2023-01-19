let myBookmarks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myBookmarks") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myBookmarks = leadsFromLocalStorage
    render(myBookmarks)
}

tabBtn.addEventListener("click", function(){    
    //The below works only in the context of a browser extension.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myBookmarks.push(tabs[0].url)
        localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks) )
        render(myBookmarks)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myBookmarks = []
    render(myBookmarks)
})

inputBtn.addEventListener("click", function() {
    myBookmarks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks) )
    render(myBookmarks)
})