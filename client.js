const socket = new WebSocket('wss://webgroupchat-server-jacker-bp71.onrender.com', "HTTPS");

let username;
let lastUser;

function enter(e) {
    e.preventDefault();
    
    username = document.getElementById('username').value;

    if (username) {
        document.body.innerHTML = `
        <link rel="stylesheet" href="style/style.css">
        `
        document.body.innerHTML += `
        <div id="messages"></div>
        <form onsubmit="msg(event); return false;">
        <input type="text" placeholder="Aa" maxlength="1000" id="text" autocomplete="off" >
        </form> 
        `
    }

    return false;
};

function msg(e) {
    e.preventDefault();

    if (document.getElementById('text').value) {
        const data = {username: username};
        data.message = document.getElementById('text').value;
        
        socket.send(JSON.stringify(data));
        showMessage(document.getElementById('text').value, true);

        document.getElementById('text').value = "";
        document.getElementById('messages').scrollBy(0, 6000);
    }
}

socket.addEventListener('message', e => {
    e.data.text().then(res => JSON.parse(res)).then(data => {
        showMessage(data.message, false, data.username);
    })
    document.getElementById('messages').scrollBy(0, 6000);
});

const showMessage = (str, isMine = false, user = 'You') => {

    document.getElementById('messages').innerHTML += `
        <div class="messageContainer ${isMine ? 'mine' : 'notMine'}">
            ${lastUser === user ? '' : `<span>${user}</span>`}
            <div class="messageCloud">${str}</div>
        </div>
    `

    lastUser = user;
}

