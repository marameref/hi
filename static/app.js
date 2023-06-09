
class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatbox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }
        this.state = false;
        this.messages = [];
    }
}


function display(cbox)
 {
    const { openButton, chatbox, sendButton } = cbox.args;

    openButton.addEventListener('click', () => this.toggleState(chatbox));

    sendButton.addEventListener('click', () => this.onSendButton(cbox));

    const node = chatbox.querySelector('input');
    node.addEventListener('keyup', ({ key }) => {
        if (key === 'Enter') {
            this.onSendButton(chatbox);
        }
    });
}

function toggleState(chatbox)
{
    this.state =!this.state;

    //shows or hides the boxes
    if (this.state) {
        chatbox.classList.add('chatbox--active')
    }  else {
        chatbox.classList.remove('chatbox--active')
    }
}

function toggleState(chatbox) {
    this.state = !this.state;

    // Show or hide the chatbox
    if (this.state) {
        chatbox.classList.add('chatbox--active');
    } else {
        chatbox.classList.remove('chatbox--active');
    }
}

function onSendButton(chatbox) {
    var textField = document.querySelector('input');
    let text1 = textField.value;
    if (text1 == "") {
        return null;
    }

    let msg1 = { name: "User", message: text1 };
    chatbox.messages.push(msg1);
  // http://127.0.0.1.5000/predict
    fetch($SCRIPT_ROOT + '/predict', {
        method: 'POST',
        body: JSON.stringify({ message: text1 }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(r => r.json())
        .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            chatbox.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox);
            textField.value = '';
        });
}

function updateChatText(chatbox) {
    var html = '';
    chatbox.messages.slice().reverse().forEach(function(item, index) {
        if (item.name == "Sam") {
            html += '<div class="messages__item messages__item--visitors">' + item.message + '</div>'
        } else {
            html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
        }
    });

    const chatmessage = document.querySelector('.chatbox__messages');
    chatmessage.innerHTML = html;
}

let chatbox = new Chatbox();
display(chatbox);


