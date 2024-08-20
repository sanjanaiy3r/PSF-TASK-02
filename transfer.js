const customers = [
    { id: 1, name: "Amit Kumar", email: "amit@example.com", balance: 5000 },
    { id: 2, name: "Sanjana Iyer", email: "sanjana@example.com", balance: 3000 },
    { id: 3, name: "Rohit Sharma", email: "rohit@example.com", balance: 7000 },
    { id: 4, name: "Priya Singh", email: "priya@example.com", balance: 4000 },
    // Add more customers as needed
];

let sender = null;
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function loadReceivers() {
    const senderId = parseInt(localStorage.getItem('selectedSenderId'));
    sender = customers.find(c => c.id === senderId);

    const receiverSelect = document.getElementById('receiver');
    receiverSelect.innerHTML = '';

    customers.forEach(customer => {
        if (customer.id !== senderId) { 
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = `${customer.name} (Balance: INR ${customer.balance})`;
            receiverSelect.appendChild(option);
        }
    });

    document.getElementById('sender-name').textContent = sender.name;
}

function transferAmount(event) {
    event.preventDefault();

    const receiverId = parseInt(document.getElementById('receiver').value);
    const amount = parseInt(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0 || amount > sender.balance) {
        alert('Invalid amount. Please enter a valid amount within your balance.');
        return;
    }

    const receiver = customers.find(c => c.id === receiverId);
    sender.balance -= amount;
    receiver.balance += amount;

    // Store transaction history
    const transaction = {
        date: new Date().toLocaleString(),
        sender: sender.name,
        receiver: receiver.name,
        amount: amount
    };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update localStorage for customers
    localStorage.setItem('customers', JSON.stringify(customers));

    // Show confirmation
    document.getElementById('result').textContent = `Transfer of INR ${amount} to ${receiver.name} was successful!`;
    document.getElementById('result').style.display = 'block';

    // Reset form
    document.getElementById('transfer-form').reset();
}

document.getElementById('transfer-form').addEventListener('submit', transferAmount);
window.onload = loadReceivers;
