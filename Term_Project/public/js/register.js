const e = require('express');

function register() {
    // Get form data
    const email = $('#email').val();
    const password = $('#password').val();
    const role = $('#role').val();
    const name = $('#name').val();

    // Basic client side validation
    valid = validation(name, email, role, password);

    // Create a JSON object with the form data
    const formData = {
        name: name,
        email: email,
        role: role,
        password: password,
    };

    if (valid) {
        // Perform a POST request using jQuery
        $.ajax({
            url: '/register', // Assuming you have a '/register' endpoint on the server
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (data) {
                alert(data.message);
                window.location.href = '/login';
            },
            error: function (error) {
                alert(error.responseJSON.error);
            },
        });
    }
}

function validation(name, email, role, password) {
    if (
        !name ||
        name.length < 3 ||
        name.length > 50 ||
        !/^[A-Za-z\s]+$/.test(name)
    ) {
        alert(
            'Please enter a valid name (3-50 characters, no numbers or special characters)!'
        );
        return false;
    } else if (!email || email.length > 50) {
        alert('Please enter a valid email address (maximum 50 characters)!');
        return false;
    } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert('Please enter a valid email address!');
        return false;
    } else if (!role) {
        alert('Please select a role!');
        return false;
    } else if (!password || password.length < 8) {
        alert('Password must be at least 8 characters!');
        return false;
    } else {
        return true;
    }
}
