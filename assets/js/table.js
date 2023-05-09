function sortTable(column) {
  const table = document.getElementById("myTable");
  const headers = table.querySelectorAll("th");
  const rows = Array.from(table.querySelectorAll("tr:not(:first-child)"));
  const currentHeader = headers[column];

  // Determine the sort direction
  const currentDir = currentHeader.dataset.sortDir || "none";
  const newDir = currentDir === "asc" ? "desc" : "asc";

  // Remove sorted classes from all headers and set the new sort direction
  headers.forEach((header) => {
    header.classList.remove("sorted-asc", "sorted-desc", "sorted-none");
    header.dataset.sortDir = "none";
    header.classList.add("sorted-none");
  });

  currentHeader.classList.remove("sorted-none");
  currentHeader.classList.add(`sorted-${newDir}`);
  currentHeader.dataset.sortDir = newDir;

  // Sort the rows array based on the selected column
  rows.sort((a, b) => {
    const x = a.cells[column].textContent.trim();
    const y = b.cells[column].textContent.trim();
    const compareVal = isNaN(x) ? x.localeCompare(y) : parseFloat(x) - parseFloat(y);

    return newDir === "asc" ? compareVal : -compareVal;
  });

  // Reinsert the sorted rows into the table
  for (const row of rows) {
    table.tBodies[0].appendChild(row);
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("myTable");
  const rows = table.querySelectorAll("tr:not(:first-child)");

  // Clear the search input
  searchInput.value = "";

  // Debounce function to limit the number of times the search function is called
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Function to extract relevant keywords from a string
  function extractKeywords(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ") // Replace non-alphanumeric characters with spaces
      .trim() // Remove leading and trailing spaces
      .split(" ") // Split into an array of words
      .filter((word) => word.length > 2) // Filter out words with less than 3 characters
      .join(" "); // Join the array back into a space-separated string
  }

  // Function to extract relevant keywords from a string
  function extractKeywordsList(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ") // Replace non-alphanumeric characters with spaces
      .trim() // Remove leading and trailing spaces
      .split(" ") // Split into an array of words
  }

  // Cache the relevant keywords in the data-keywords attribute
  rows.forEach((row) => {
    row.dataset.keywords = extractKeywords(row.textContent);
  });

  searchInput.addEventListener(
    "keyup",
    debounce(function () {
      const searchStringList = extractKeywordsList(searchInput.value);

      for (const row of rows) {
        const rowKeywords = row.dataset.keywords;

        const newArray = searchStringList.map((element) => {
          return rowKeywords.includes(element);
        });

        const areAllTrue = newArray.every((element) => {
          return element === true;
        });

        if (areAllTrue) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    }, 100)
  );
});

function clearSearchAndResetRows() {
  searchInput.value = "";
  const table = document.getElementById("myTable");
  const rows = table.querySelectorAll("tr:not(:first-child)");
  rows.forEach((row) => {
    row.style.display = "";
  });
}

// Clear the search input and reset rows display when the back button is pressed
window.addEventListener("pageshow", function (event) {
  console.log("hello")
  clearSearchAndResetRows();
});