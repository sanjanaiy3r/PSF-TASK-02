const customers = [
    { id: 1, name: "Amit Kumar", email: "amit@example.com", balance: 5000 },
    { id: 2, name: "Sanjana Iyer", email: "sanjana@example.com", balance: 3000 },
    { id: 3, name: "Rohit Sharma", email: "rohit@example.com", balance: 7000 },
    { id: 4, name: "Priya Singh", email: "priya@example.com", balance: 4000 },
    // Add more customers as needed
];

function loadCustomers() {
    const tableBody = document.querySelector('#customers-table tbody');
    tableBody.innerHTML = '';

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.balance}</td>
            <td><button onclick="selectCustomer(${customer.id})">Select</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function selectCustomer(customerId) {
    localStorage.setItem('selectedSenderId', customerId);
    window.location.href = 'transfer.html';
}

window.onload = loadCustomers;
