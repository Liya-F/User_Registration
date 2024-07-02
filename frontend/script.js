document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const userTableBody = document.querySelector('#userTable tbody');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            fetchUsers();
        })
        .catch(error => console.error('Error:', error));
    });

    function fetchUsers() {
        fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then(users => {
            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    fetchUsers();
});
