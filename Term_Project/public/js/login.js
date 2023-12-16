function login() {
    // Get form data
    const email = $('#email').val();
    const password = $('#password').val();

    // Basic client side validation
    if (!email || !password) {
        alert('Please enter email and password!');
        return;
    } else if (password.length < 8) {
        alert('Password must be at least 8 characters!');
        return;
    } else if (email.indexOf('@') === -1) {
        alert('Please enter a valid email address!');
        return;
    } else if (email.indexOf('.') === -1) {
        alert('Please enter a valid email address!');
        return;
    }

    // Create a JSON object with the form data
    const formData = {
        email: email,
        password: password,
    };

    // Perform a POST request using jQuery
    $.ajax({
        url: '/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (data) {
            alert(data.message);
            window.location.href = '/home';
        },
        error: function (error) {
            alert(error.responseJSON.error);
        },
    });
}
