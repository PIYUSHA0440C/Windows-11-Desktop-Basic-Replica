const desktop = document.querySelector('#desktop')
const startBtn = document.querySelector('#start-btn')
const menus = document.querySelector('#menus')
const taskbarRight = document.querySelector('#taskbar-right')
const startMenu = document.querySelector('#start-menu')

// Start Button
const startBtnIcon = `./Screenshot 2026-02-13 144455.png`
startBtn.innerHTML = `<img src="${startBtnIcon}" alt="">`

// Menu list in Menus Box
let menu = [
    {
        name: 'View',
    },
    {
        name: 'Sort by',
    },
    {
        name: 'Refresh',
    },
    {
        name: 'Undo Move',
    },
    {
        name: 'New',
    },
    {
        name: 'Display settings',
    },
    {
        name: 'Personalize',
    },
    {
        name: 'Open in Terminal',
    },
    {
        name: 'Show more options',
    },
]

menu.forEach(menu => {
    let div = document.createElement('div')
    div.classList.add('menu')
    div.innerHTML = `${menu.name}`

    menus.appendChild(div)
})

// Applications's Icons Data with Rendering
let iconsData = [
    {
        name: 'File Explorer',
        icon: ''
    },
    {
        name: 'Chrome',
        icon: ''
    },
    {
        name: 'Whatsapp',
        icon: ''
    },
    {
        name: 'VS Code',
        icon: ''
    },
    {
        name: 'Git',
        icon: ''
    },
    {
        name: 'Git',
        icon: ''
    },
]

function applications(component){
    const parent = document.getElementById(component)
    iconsData.forEach(iconItem => {
        let div = document.createElement('div')
        div.classList.add('icon')
        div.innerHTML = `<img src="${iconItem.icon}" alt="">`
        if(component === 'start-menu'){
            div.classList.add('start-icon')
            div.innerHTML = `<img src="${iconItem.icon}" alt="">
                             <h1>${iconItem.name}</h1>`
        }
    
        parent.appendChild(div)
    })
}

applications('task-icons') // Taskbar Apps
applications('start-menu') // Start Menu Apps

// Menu - Popup Event
const menuPopUp = (event)=>{
    return (event)=>{
        menus.style.top = `${event.clientY}px`;
        menus.style.left = `${event.clientX}px`;
        let menusState = window.getComputedStyle(menus).display
        if(menusState === 'block'){
            menus.style.display = 'none'
        } else {
            menus.style.display = 'block'
        }
    }
    
}

function startMenuClose(){
    startMenu.style.bottom = `-100%`
    startMenu.style.opacity = 0
}

function startMenuOpen(){
    startMenu.style.bottom = `calc(anchor(top) + 1.5rem)`
    startMenu.style.opacity = 1
}

// Event Listeners
desktop.addEventListener('contextmenu',menuPopUp(event))
desktop.addEventListener('click',(details)=>{ 
    menus.style.display = 'none'
    // startMenu.style.bottom = `0`
    // startMenu.style.opacity = 0
    console.log(details.target);
    
    // Start menu Opening - Closing Logic
    if (details.target.id === 'start-btn') {
        if(startMenu.style.opacity == 1){
            startMenuClose()
        } else{
            startMenuOpen()
        }
    } else {
        startMenuClose()
    }
    
})

document.addEventListener('contextmenu',function(e){
    e.preventDefault()
    startMenuClose()
})

// Date And Time
function dateAndTime(){
    let now = new Date();
    let time = now.toLocaleTimeString("en-IN",{
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
    let date = now.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    taskbarRight.innerHTML = `<div>${time}</div>
                              <div>${date}</div>`
}
dateAndTime()
setInterval(dateAndTime, 1000);