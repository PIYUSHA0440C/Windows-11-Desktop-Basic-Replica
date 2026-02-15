const desktop = document.querySelector('#desktop')
const startBtn = document.querySelector('#start-btn')
const menus = document.querySelector('#menus')
const taskbarRight = document.querySelector('#taskbar-right')
const startMenu = document.querySelector('#start-menu')

// Start Button
const startBtnIcon = `https://img.icons8.com/?size=100&id=TuXN3JNUBGOT&format=png&color=000000`
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
        icon: 'https://img.icons8.com/?size=100&id=GzCW12vGkSHM&format=png&color=000000'
    },
    {
        name: 'Chrome',
        icon: 'https://img.icons8.com/?size=100&id=ejub91zEY6Sl&format=png&color=000000'
    },
    {
        name: 'Whatsapp',
        icon: 'https://img.icons8.com/?size=100&id=MW3L3LMSpawR&format=png&color=000000'
    },
    {
        name: 'VS Code',
        icon: 'https://img.icons8.com/?size=100&id=9OGIyU8hrxW5&format=png&color=000000'
    },
    {
        name: 'Git',
        icon: 'https://img.icons8.com/?size=100&id=20906&format=png&color=000000'
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