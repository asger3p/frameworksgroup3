document.addEventListener("DOMContentLoaded", function() {

    // Populate country dropdowns
    populateCountryDropdown();

    // Handle billing address checkbox
    const differentBillingCheckbox = document.getElementById('differentBilling');
    const billingAddressForm = document.getElementById('billingAddressForm');

    if (differentBillingCheckbox && billingAddressForm) {
        // Initial state
        billingAddressForm.style.display = differentBillingCheckbox.checked ? 'block' : 'none';

        // Event listener for checkbox changes
        differentBillingCheckbox.addEventListener('change', function() {
            billingAddressForm.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Function to load cart items from localStorage and display on checkout page
    function loadCheckoutCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItemsContainer = document.getElementById("checkout-cart-items");
        // const productsTotal = document.getElementById("products-total");

        // Clear the container
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<tr><td colspan='3'>Your cart is empty.</td></tr>";
            updateOrderSummary(0);
            return;
        }

        let total = 0;

        // Loop through cart items and add them to checkout page
        cart.forEach(item => {
            const itemTotalPrice = item.price * item.quantity;
            total += itemTotalPrice;

            const cartRow = document.createElement("tr");
            cartRow.innerHTML =
                '<td>' +
                '    <div class="d-flex align-items-center">' +
                '        <img src="' + item.image + '" alt="' + item.name + '" class="img-fluid" style="max-width: 50px; margin-right: 10px;">' +
                '       <span>' + item.name + ' (' + item.size + ')</span>' +
                '    </div>' +
                '</td>' +
                '<td>' + item.quantity + '</td>' +
                '<td class="text-end">' + itemTotalPrice + ' kr</td>';

            cartItemsContainer.appendChild(cartRow);
        });

        // Update order summary
        updateOrderSummary(total);
    }

    // Function to update order summary
    function updateOrderSummary(subtotal) {
        // Calculate VAT (in DK 25%)
        const VAT_RATE = 0.25;
        const vat = subtotal * VAT_RATE;

        // Add selected shipping option (+ set default to standard shipping)
        let shippingCost = 39;
        if (document.getElementById("express") && document.getElementById("express").checked) {
            shippingCost = 89; // Express shipping
        }

        // Calculate total
        const total = subtotal + shippingCost;

        // Update display
        if (document.getElementById("products-total")) {
            document.getElementById("products-total").textContent = `${subtotal} kr`;
        }
        if (document.getElementById("shipping-cost")) {
            document.getElementById("shipping-cost").textContent = `${shippingCost} kr`;
        }
        if (document.getElementById("vat-total")) {
            document.getElementById("vat-total").textContent = `${vat.toFixed(2)} kr`;
        }
        if (document.getElementById("order-total")) {
            document.getElementById("order-total").textContent = `${total} kr`;
        }
    }

    // Load cart items when page loads
    loadCheckoutCart();

    // Check for changes in shipping option
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    if (shippingOptions.length > 0) {
        shippingOptions.forEach(input => {
        input.addEventListener('change', function() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            let subtotal = 0;
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
            });
            updateOrderSummary(subtotal);
        });
    });
}

    // Handle payment method selection
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const ccForm = document.getElementById('ccForm');
    if (paymentOptions.length > 0 && ccForm) {
        paymentOptions.forEach(input => {
            input.addEventListener('change', function() {
                const ccForm = document.getElementById('ccForm');
                if (document.getElementById('creditCard') && document.getElementById('creditCard').checked) {
                    ccForm.style.display = 'block';
                } else {
                    ccForm.style.display = 'none';
                }
            });
        });

        // Initialize payment form visibility on page load
        if (document.getElementById('creditCard') && document.getElementById('creditCard').checked) {
            ccForm.style.display = 'block';
        } else {
            ccForm.style.display = 'none';
        }
    }    

    document.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });

        // Add event listener for the complete order button
        const completeOrderButton = document.querySelector('button[type="submit"]');
        if (completeOrderButton) {
            completeOrderButton.addEventListener('click', function(event) {
                event.preventDefault();
    
                if (validateCheckoutForm()) {
                    alert('Thank you for your order!\nYour order number is XXXXXX.\nYou will receive the order confirmation by email within a few minutes.');
    
                    // Clear the cart
                    localStorage.removeItem('cart');
                }
            });
        }
    });


    // Required fields for placing order
    function validateCheckoutForm() {
        const requiredFields = [
            {id: 'checkout-email', name: 'Email'},
            {id: 'phone', name: 'Phone Number'},
            {id: 'firstName', name: 'First Name'},
            {id: 'lastName', name: 'Last Name'},
            {id: 'address', name:'Street Address'},
            {id: 'zip', name: 'Zip/Postal Code'},
            {id: 'city', name: 'City'},
            {id: 'country', name: 'Country'}
        ];

        // Required credit card fields
        if (document.getElementById('creditCard') && document.getElementById('creditCard').checked) {
            requiredFields.push(
                {id: 'cardName', name: 'Name on Card'},
                {id: 'cardNumber', name: 'Card Number'},
                {id: 'expDate', name: 'Expiration Date'},
                {id: 'cvv', name: 'CVV'}
            );
        }

        // Different billing address
        if (document.getElementById('differentBilling') && document.getElementById('differentBilling').checked) {
            requiredFields.push(
                {id: 'billingFirstName', name: 'First Name'},
                {id: 'billingLastName', name: 'Last Name'},
                {id: 'billingAddress', name:'Street Address'},
                {id: 'billingZip', name: 'Zip/Postal Code'},
                {id: 'billingCity', name: 'City'},
                {id: 'billingCountry', name: 'Country'}
            );
        }

        // Check if all required fields are filled
        const emptyFiels = [];
        requiredFields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element && (element.value === '' || element.value === 'Choose a Country')) {
                emptyFiels.push(field.name);
                element.classList.add('is-invalid');
            } else if (element) {
                element.classList.remove('is-invalid');
            }
        });

        // Show alert for empty fields
        if (emptyFiels.length > 0) {
            alert('Please fill in the following required fields: ' + emptyFiels.join(', '));
            return false;
        }
        return true;
    }

// Function to fill country dropdown
function populateCountryDropdown() {
    const countries = [
    "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", 
    "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", 
    "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", 
    "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", 
    "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", 
    "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", 
    "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", 
    "Switzerland", "Ukraine", "United Kingdom"
    ];

    // Get all country select elements (shipping and billing)
    const shippingCountrySelect = document.getElementById('country');
    const billingCountrySelect = document.getElementById('billingCountry');

    function populateDropdown(selectElement) {
        if (selectElement) {
            // Default option
            const defaultOption = selectElement.querySelector('option');

            // Clear existing options, keep default
            selectElement.innerHTML = '';
            // Set back default option 
            if (defaultOption) {
                selectElement.appendChild(defaultOption);   
            }

            // Country options
            countries.forEach (country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;

                // Set default
                if (country === "Choose a Country") {
                    option.selected = true;
                }
                selectElement.appendChild(option);
            });
        }
    }

    // Fill both dropdowns
    populateDropdown(shippingCountrySelect);
    populateDropdown(billingCountrySelect);   
}