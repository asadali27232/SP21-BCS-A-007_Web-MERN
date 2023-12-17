let editedProduct = {};

function searchProduct() {
    let prdBox = document.getElementsByClassName('prd-box')[0];
    let searchKey = document.getElementById('search-prd');

    for (let i = 0; i < prdBox.children.length; i++) {
        let searchString = searchKey.value.toString().toUpperCase();
        let productString =
            prdBox.children[i].children[1].children[0].innerText.toString();

        if (searchString == '') {
            prdBox.children[i].style.display = 'flex';
        } else if (productString.includes(searchString)) {
            prdBox.children[i].style.display = 'flex';
        } else {
            prdBox.children[i].style.display = 'none';
        }
    }
}

function editProduct(_id) {
    document.getElementById('add-edit-btn').innerText = 'Edit Product';

    // Get product from database
    $.ajax({
        url: '/getProduct',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ _id: _id }),
        success: function (data) {
            document.getElementById('name').value = data.product.name;
            document.getElementById('price').value = data.product.price;
            let id = data.product.id;
            document
                .getElementById('add-edit-btn')
                .setAttribute('onclick', `updateProduct('${_id}', '${id}')`);
        },
        error: function (error) {
            alert(error.responseJSON.error);
        },
    });
}

function updateProduct(_id, id) {
    let updatedProduct = {
        _id: _id,
        id: id,
        name: $('#name').val(),
        price: $('#price').val(),
    };

    // Perform a POST request using jQuery
    $.ajax({
        url: '/updateProduct',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(updatedProduct),
        success: function (data) {
            alert(data.message);
            window.location.reload();
        },
        error: function (error) {
            alert(error.responseJSON.error);
        },
    });
}

function addProduct() {
    // Get form data
    const name = $('#name').val().toString().toUpperCase();
    const price = $('#price').val();

    // Basic client side validation
    if (!name || !price) {
        alert('Please enter name and price!');
        return;
    } else if (name.length < 1 || name.length > 50) {
        alert('Please enter a valid name (1-50 characters)!');
        return;
    } else if (price < 0) {
        alert('Please enter a valid price!');
        return;
    } else if (price > 1000000000) {
        alert('Please enter a valid price!');
        return;
    }

    // Create a JSON object with the form data
    const formData = {
        name: name,
        price: price,
    };

    // Perform a POST request using jQuery
    $.ajax({
        url: '/addProduct',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (data) {
            alert(data.message);
            $('#name').val('');
            $('#price').val('');
            window.location.reload();
        },
        error: function (error) {
            alert(error.responseJSON.error);
        },
    });
}
