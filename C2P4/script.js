async function fetchData() {
    const loading = document.getElementById("loading");

    try {
        // Show loading indicator (only if element exists)
        if (loading) loading.style.display = "block";

        // Fetch data from API
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const users = await response.json();
        renderData(users);

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data");
    } finally {
        // Hide loading indicator (only if element exists)
        if (loading) loading.style.display = "none";
    }
}

function renderData(data) {
    const dataBody = document.getElementById("dataBody");
    if (!dataBody) return;
    dataBody.innerHTML = "";

    if (!Array.isArray(data)) return;

    data.forEach(user => {
        const row = document.createElement("tr");

        // use textContent for cells to avoid unexpected HTML injection
        const idCell = document.createElement("td");
        idCell.textContent = user.id;

        const nameCell = document.createElement("td");
        nameCell.textContent = user.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);

        dataBody.appendChild(row);
    });
}

// Call function when page loads to ensure DOM elements exist
window.addEventListener('DOMContentLoaded', fetchData);
