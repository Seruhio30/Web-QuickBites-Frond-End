document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:8080/api/products")
        .then(response => response.json())
        .then(products => {
            const productSelect = document.getElementById("product");
            products.forEach(product => {
                const option = document.createElement("option");
                option.value = product.id;
                option.textContent = product.name;
                productSelect.appendChild(option);
            });
        });
});

document.getElementById("whatsapp-order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const orderData = {
        customerName: document.getElementById("customerName").value,
        items: [
            {
                product: { id: document.getElementById("product").value },
                quantity: document.getElementById("quantity").value,
                price: document.getElementById("price").value
            }
        ],
        status: document.getElementById("status").value
    };

    fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Pedido registrado con éxito.");
        // Aquí puedes agregar lógica adicional para limpiar el formulario o mostrar el pedido.
    })
    .catch(error => console.error("Error al registrar el pedido:", error));
});

