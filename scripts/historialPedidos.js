document.addEventListener("DOMContentLoaded", function() {
    // Realiza una solicitud al backend para obtener todos los pedidos
    fetch("http://localhost:8080/api/orders")
        .then(response => response.json())
        .then(orders => {
            const orderList = document.getElementById("order-list");
            orders.forEach(order => {
                // Crea un elemento de lista para cada pedido
                const orderItem = document.createElement("li");
                orderItem.textContent = `Pedido ID: ${order.id} - Cliente: ${order.customerName} - Estado: ${order.status} - Total: ${order.totalPrice}`;
                orderList.appendChild(orderItem);
            });
        })
        .catch(error => console.error("Error al obtener el historial de pedidos:", error));
});
