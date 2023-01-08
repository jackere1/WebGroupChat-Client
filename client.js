const socket = new WebSocket('wss://webgroupchat-server-jacker-bp71.onrender.com', "HTTPS");


const showMessage = (str, isMine = false) => {
    document.getElementById('messages').innerHTML += `
        <div class="messageContainer ${isMine ? 'mine' : 'notMine'}">
            <div class="messageCloud">${str}</div>
        </div>
    `
}

socket.addEventListener('message', e => {
    e.data.text().then(showMessage)
    window.scrollBy(0, 100);
});

const input = document.querySelector('input');
document.querySelector('form').onsubmit = e => {
    e.preventDefault();

    if (input.value) {   
        socket.send(input.value);
        showMessage(input.value, true);
        input.value = "";
        window.scrollBy(0, 100);
    }

}