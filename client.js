const socket = new WebSocket('ws://localhost:8080');

const showMessage = (str, isMine = false) => {
    document.getElementById('messages').innerHTML += `
        <div class="messageContainer ${isMine ? 'mine' : 'notMine'}">
            <div class="messageCloud">${str}</div>
        </div>
    `
}

socket.addEventListener('message', e => {
    e.data.text().then(showMessage)
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