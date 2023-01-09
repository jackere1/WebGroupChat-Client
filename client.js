const socket = new WebSocket('wss://webgroupchat-server-jacker-bp71.onrender.com', "HTTPS");

const messages = document.getElementById('messages');

const showMessage = (str, isMine = false) => {
    messages.innerHTML += `
        <div class="messageContainer ${isMine ? 'mine' : 'notMine'}">
            <div class="messageCloud">${str}</div>
        </div>
    `
}

socket.addEventListener('message', e => {
    e.data.text().then(showMessage)
    messages.scrollBy(0, 6000);
});

const input = document.querySelector('input');
document.querySelector('form').onsubmit = e => {
    e.preventDefault();

    if (input.value) {   
        socket.send(input.value);
        showMessage(input.value, true);
        input.value = "";
        messages.scrollBy(0, 6000);
    }

}