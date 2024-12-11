const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add-button");

function addTask() {
    const task = inputBox.value.trim();

    if (task === "") {
        alert("You must type something!");
        return;
    }

    // Remove placeholder if it exists
    const placeholder = document.getElementById("placeholder");
    if (placeholder) {
        placeholder.remove();
    }

    // Create a new list item
    const li = document.createElement("li");
    li.textContent = task;

    // Add delete button
    const span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Cross symbol
    li.appendChild(span);

    // Append to the list
    listContainer.appendChild(li);

    // Clear input field
    inputBox.value = "";

    saveData();
}

// Event delegation for list items
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();

        // Show placeholder if list becomes empty
        if (listContainer.children.length === 0) {
            showPlaceholder();
        }
    }
});

// Save tasks to localStorage
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Load tasks from localStorage
function loadTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    if (listContainer.children.length === 0) {
        showPlaceholder();
    }
}

// Show placeholder
function showPlaceholder() {
    const placeholder = document.createElement("li");
    placeholder.id = "placeholder";
    placeholder.textContent = "No tasks added yet!";
    placeholder.style.color = "#aaa";
    placeholder.style.pointerEvents = "none"; // Prevent interaction
    listContainer.appendChild(placeholder);
}

// Event listener for Add button
addButton.addEventListener("click", addTask);

// Load tasks on page load
loadTasks();
