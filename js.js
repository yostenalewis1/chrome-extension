let leads = [];

let buttonEl = document.getElementById("click");
let textEl = document.getElementById("text");
let ulEl = document.getElementById("ul");
let delEl=document.getElementById("delete")
let saveEl = document.getElementById("save")
const urlRegex =
  /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

  let myLeadsFromLocalstorage = JSON.parse(localStorage.getItem("storage"))
 if(myLeadsFromLocalstorage)
 {
   leads=myLeadsFromLocalstorage
    view(leads)  
 }


saveEl.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        leads.push(tabs[0].url)
        localStorage.setItem("storage", JSON.stringify(leads) )
        view(leads)
    })
})

function view(x) {
    let listItem = "";
    for (let i = 0; i < x.length; i++) {
      listItem += `<li><a href="#" data-url="${x[i]}">${x[i]}</a> </li>`;
    }
    ulEl.innerHTML = listItem;
  
    // Add click event to each link
    const links = ulEl.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function(event) {
        event.preventDefault();
        const url = this.getAttribute("data-url");
        chrome.tabs.update({ url: url });
      });
    }
  }

buttonEl.addEventListener("click", function () {
  if (!urlRegex.test(textEl.value)) {
    alert("You have entered an invalid url address!");
    textEl.value = "";
  } else {
    leads.push(textEl.value);
    //put leads.inp in localstorage
    localStorage.setItem("storage", JSON.stringify(leads));
    console.log(localStorage.getItem("storage"));

    textEl.value = "";
    view(leads);
  }
});

delEl.addEventListener("click",function()
{
leads=[]
localStorage.clear()
view(leads)
})
