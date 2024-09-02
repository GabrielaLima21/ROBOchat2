document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-upload');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');

    fileInput.addEventListener('change', () => {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            chatMessages.innerHTML += `<div class="message bot">${data.response}</div>`;
            chatInput.value = ''; 
            fileInput.value = ''; 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    window.sendMessage = () => {
        const message = chatInput.value;
        if (message.trim()) {
            chatMessages.innerHTML += `<div class="message user">${message}</div>`;
            chatInput.value = '';
        }
    };

    window.takePhoto = () => {
    
        console.log('Take photo button clicked');
    };
});
