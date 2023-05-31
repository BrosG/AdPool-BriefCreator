document.getElementById('chat-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const message = document.getElementById('message').value;

  fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('response').innerText = data.response;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
