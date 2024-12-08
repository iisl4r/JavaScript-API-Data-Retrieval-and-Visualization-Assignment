
// fetch and display data
async function fetchData() {
    const URL = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

    try {
        // Fetching data from the API
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Error fetching data from the API.");
        }

        // Parse the JSON response
        const data = await response.json();

        // Get records
        const records = data.results || [];

        // Reference to the table body
        const tbody = document.querySelector("#data-table tbody");

        // Clear any existing rows
        tbody.innerHTML = "";

        // Populate table rows with the records
        records.forEach(record => {
            const row = document.createElement("tr");

            // Create table cells and append them to the row
            row.innerHTML = `
    <td>${record.year || "N/A"}</td>
    <td>${record.semester || "N/A"}</td>
    <td>${record.the_programs || "N/A"}</td>
    <td>${record.nationality || "N/A"}</td>
    <td>${record.colleges || "N/A"}</td>
    <td>${record.number_of_students || "N/A"}</td>
    `;

            // Append row to the table body
            tbody.appendChild(row);
        });
    } catch (error) {
        // Display error message
        document.querySelector("#error-message").innerText = error.message;
    }
}

// Fetch data on page load
window.onload = fetchData;
