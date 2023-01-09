const socket = new WebSocket('wss://webgroupchat-server-jacker-bp71.onrender.com', "HTTPS");

let username;
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
        <input type="text" placeholder="Aa" maxlength="100" id="text" >
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
        console.log(data);
        
        socket.send(JSON.stringify(data));
        // socket.send(document.getElementById('text').value);
        showMessage(document.getElementById('text').value, true);

        document.getElementById('text').value = "";
        document.getElementById('messages').scrollBy(0, 6000);
    }
    console.log(username)
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
            <span>${user}</span>
            <div class="messageCloud">${str}</div>
        </div>
    `
}

