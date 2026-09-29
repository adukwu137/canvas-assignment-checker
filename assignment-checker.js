const fs = require("fs");
const { JSDOM } = require("jsdom");

// 1. Read the saved Canvas HTML file
const html = fs.readFileSync("assignments.html", "utf8");

// 2. Create a DOM object
const dom = new JSDOM(html);
const document = dom.window.document;

// Get current date
const today = new Date();

// Find all assignments using standard DOM selection
const assignments = document.querySelectorAll(".ig-title");

console.log("========================================");
console.log("       CANVAS ASSIGNMENT CHECKER        ");
console.log("========================================");
console.log("");

assignments.forEach((assignment) => {
  // Get assignment title
  const title = assignment.textContent.trim();

  // Get assignment link
  const link = assignment.getAttribute("href");

  // Find the parent assignment container
  const container = assignment.closest(".assignment");

  // Find the due date element inside container
  const timeElem = container ? container.querySelector(".assignment-date-due time") : null;
  const dueTime = timeElem ? timeElem.getAttribute("datetime") : null;

  let status = "";
  let dueDate = "No due date";

  // Check and format due date status
  if (!dueTime) {
    status = "NO DATE SET";
  } else {
    const due = new Date(dueTime);
    dueDate = due.toLocaleString();

    // Check if assignment has passed
    if (today > due) {
      status = "EXPIRED";
    }
    // Check if due within 7 days (604800000 ms)
    else if (due - today <= 604800000) {
      status = "DUE SOON";
    }
    // Otherwise active
    else {
      status = "ACTIVE";
    }
  }

  // Display summary output
  console.log("Assignment Title: " + title);
  console.log("Status: " + status);
  console.log("Due Date: " + dueDate);
  console.log("Link: " + (link ? link : "Not available"));
  console.log("----------------------------------------");
});