// Load projects.json and build the grid
async function loadProjects() {
    const grid = document.getElementById("grid");

    // Fetch the JSON file
    const projects = await fetch("data/projects.json").then(res => res.json());

    // Loop through project array and create grid items (cards)
    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card"; 
        card.dataset.file = project.file;

        // Card content (thumbnail & title) in HTML
        card.innerHTML = `
            <div class="thumb">
                <img src="${project.thumb}" alt="${project.title}" />
            </div>
            <p class="title">${project.title}</p>
        `;

        // Add click event to open the project (detail-view)
        card.addEventListener("click", () => {
            openProject(project.file);
        });

        grid.appendChild(card);
    });
}

// Load the HTML fragment (the HTML file for each project) and show it in the modal
async function openProject(file) {
    const detailView = document.getElementById("detail-view");

    // Fetch the HTML fragment
    const html = await fetch(file).then(res => res.text());

    // Insert the project content into the detail view
    detailView.innerHTML = `
    <button class="close-btn" onclick="closeProject()">Close</button>
    <div class="project-content">${html}</div>
    `;

    detailView.classList.add("open");
}

// Close the project detail view (the modal) 
function closeProject() {
    const detailView = document.getElementById("detail-view");
    detailView.classList.remove("open");
}

// Initialize the grid (run the function) on page load
loadProjects();