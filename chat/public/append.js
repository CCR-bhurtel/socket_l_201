const appendMessage = (message) => {
    const messageContainer = document.querySelector('.message-container');

    const messageBulk = messageContainer.lastElementChild;

    let heightToBeAdded = 0;
    if (message.id == chatId) {
        const messageEl = document.createElement('div');
        messageEl.classList.add('message');
        messageEl.classList.add('my-message');
        messageEl.innerText = message.text;

        if (messageBulk && messageBulk.classList.contains('mine')) {
            messageBulk.appendChild(messageEl);
            heightToBeAdded = messageEl.clientHeight;
            messageContainer.appendChild(messageBulk);
        } else {
            const newMessageBulk = document.createElement('div');
            newMessageBulk.classList.add('message-bulk');
            newMessageBulk.classList.add('mine');

            newMessageBulk.appendChild(messageEl);
            heightToBeAdded = messageEl.clientHeight;
            messageContainer.appendChild(newMessageBulk);
        }
    } else {
        const messageEl = document.createElement('div');
        messageEl.classList.add('message');
        messageEl.classList.add('not-my-message');
        messageEl.innerText = message.text;
        if (messageBulk && messageBulk.classList.contains('notmine')) {
            messageBulk.appendChild(messageEl);
            heightToBeAdded = messageEl.clientHeight;
            messageContainer.appendChild(messageBulk);
        } else {
            const newMessageBulk = document.createElement('div');
            newMessageBulk.classList.add('message-bulk');
            newMessageBulk.classList.add('notmine');

            newMessageBulk.appendChild(messageEl);
            heightToBeAdded = messageEl.clientHeight;
            messageContainer.appendChild(newMessageBulk);
        }
    }
    messageContainer.scrollTop = messageContainer.scrollHeight;
};
