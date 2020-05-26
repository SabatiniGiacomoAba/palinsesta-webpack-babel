
require('normalize.css/normalize.css');
require('./styles/index.scss');

const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

// menu moving
var elmnts = document.querySelectorAll('.middle-container > div');
var elmntsLength = elmnts.length
let menuCounter = 0

var myTimer = setInterval(moveMenus,500)

function moveMenus(){
  elmnts.forEach(el => {
    el.style.zIndex = "initial";
  })
  elmnts[menuCounter].style.zIndex = "9";
  if (menuCounter == elmntsLength-1) {
    menuCounter = 0
  } else {
    menuCounter++
  }
}
elmnts.forEach(el => {
  el.onmouseover = () =>{
    elmnts.forEach(el => {
      el.style.zIndex = "0"
    })
    el.style.zIndex = "9"

  }
})
document.querySelector(".middle-container").onmouseenter= () => {
  clearInterval(myTimer)
}
document.querySelector(".middle-container").onmouseleave= () => {
  myTimer = setInterval(moveMenus,500)
}




//interaction
let counter =0;


elmnts.forEach(el => {
    el.onclick = () =>{
        showPopups("ASMR",lorem.generateParagraphs(3),"https://www.youtube.com/embed/P3TG8tq8zj4")
    }
})

function showPopups(title,content, link) {
    var popup_container = document.createElement("div")
    popup_container.classList.add("popup-window")
    var title_container = document.createElement("div")
    title_container.classList.add("title-container")
    title_container.id = "title-container-"+counter;
    
    var _title = document.createElement("h1")
    var content_container = document.createElement("div")
    content_container.classList.add("content-container")
    _title.textContent = title
    var _content = document.createElement("p")
    _content.textContent = content
    content_container.appendChild(_content)
    title_container.appendChild(_title)
    popup_container.appendChild(title_container)
    popup_container.appendChild(content_container)
    
    
    
    document.body.appendChild(popup_container)
    popup_container.style.top = (Math.random()* window.innerHeight)/3 + "px";
    popup_container.style.left = (Math.random()* window.innerWidth)/3 + "px";
   dragElement(popup_container,counter)
   counter++

    var video_container = document.createElement("div")
    video_container.classList.add("video-window")

    var iframe = document.createElement("iframe");
    iframe.setAttribute("src",link);
    iframe.setAttribute("autoplay","true")
    video_container.appendChild(iframe)

    document.body.appendChild(video_container)
    video_container.style.top = Math.random()* window.innerHeight/3 + "px";
    video_container.style.left = Math.random()* window.innerWidth/3 + "px";
    //dragElement(video_container)


}





function dragElement(elmnt,num) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("title-container-"+num)) {
      // if present, the header is where you move the DIV from:
      document.getElementById("title-container-"+num).onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      //elmnt.onmousedown = dragMouseDown;
    }
    
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }