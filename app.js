document.getElementById('briefForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const product = document.getElementById('product').value;
    const targetAudience = document.getElementById('targetAudience').value;
    const advertisingChannel = document.getElementById('advertisingChannel').value;

    fetch('/createBrief', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            product,
            targetAudience,
            advertisingChannel,
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('brief').textContent = data.brief;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
