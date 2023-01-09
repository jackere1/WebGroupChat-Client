const socket = new WebSocket('wss://webgroupchat-server-jacker-bp71.onrender.com', "HTTPS");

let username = "";
function enter(e) {
    console.log("PEZ")
    e.preventDefault();
    
    username = document.getElementById('username').value;
    document.body.innerHTML = `
        <link rel="stylesheet" href="style/style.css">
    `
    document.body.innerHTML += `
        <div id="messages"></div>
        <form onsubmit="msg(event); return false;">
            <input type="text" placeholder="Aa" maxlength="100" id="text" >
        </form> 
    `
    return false;
};

function msg(e) {
    e.preventDefault();

    if (document.getElementById('text').value) {
        socket.send(document.getElementById('text').value);
        showMessage(document.getElementById('text').value, true);
        document.getElementById('text').value = "";
        document.getElementById('messages').scrollBy(0, 6000);
    }
}
socket.addEventListener('message', e => {
    e.data.text().then(showMessage)
    document.getElementById('messages').scrollBy(0, 6000);
});

const showMessage = (str, isMine = false) => {
    document.getElementById('messages').innerHTML += `
        <div class="messageContainer ${isMine ? 'mine' : 'notMine'}">
            <div class="messageCloud">${str}</div>
        </div>
    `
}

