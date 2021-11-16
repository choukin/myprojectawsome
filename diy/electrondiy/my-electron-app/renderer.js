const NOTIFICATION_TITLE = 'Title1'
const NOTIFICATION_BODY = 'Notification from the Renderer process. CLick to log to console'
const CLICK_MESSAGE = 'Notification clicked'

new Notification(
    NOTIFICATION_TITLE,
    {
        body:NOTIFICATION_BODY
    }
).onclick=()=>{
    document.getElementById('output').innerText = CLICK_MESSAGE
    console.log(CLICK_MESSAGE);
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()

function updateOnlineStatus(){
document.getElementById('status').innerHTML = navigator.onLine?'online':'offline'
}

document.getElementById('drag').ondragstart = (event)=>{
    event.preventDefault()
    window.electron.startDrag('recently-used.md')
}

document.getElementById('toggle-dark-mode').addEventListener('click',async()=>{
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode?'Dark':'Light'
})

document.getElementById('reset-to-system').addEventListener('click',async()=>{
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
})

document.getElementById('generation-poster').addEventListener('click',async()=>{
    await window.darkMode.generationPoster()
})