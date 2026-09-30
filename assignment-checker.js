const fs = require("fs");
const { JSDOM } = require("jsdom");

// Read the Canvas HTML
const html = fs.readFileSync("assignments.html", "utf8");

// Create a browser-like window with JSDOM
const dom = new JSDOM(html);
const window = dom.window;

// Load jQuery 4 using its JSDOM factory
const { jQueryFactory } = require("jquery/factory");
const $ = jQueryFactory(window);

// Get today's date
const today = new Date();

// Find all assignments
const assignments = $(".ig-title");

console.log("========================================");
console.log("       CANVAS ASSIGNMENT CHECKER");
console.log("========================================");
console.log("");

assignments.each(function () {
    const assignment = $(this);

    const title = assignment.text().trim();
    const link = assignment.attr("href");
    const container = assignment.closest(".assignment");

    const dueTime = container
        .find(".assignment-date-due time")
        .attr("datetime");

    let status = "";
    let dueDate = "No due date";

    if (!dueTime) {
        status = "NO DATE SET";
    } else {
        const due = new Date(dueTime);
        dueDate = due.toLocaleString();

        if (today > due) {
            status = "EXPIRED";
        } else if ((due - today) <= 7 * 24 * 60 * 60 * 1000) {
            status = "DUE SOON";
        } else {
            status = "ACTIVE";
        }
    }

    console.log("Assignment Title: " + title);
    console.log("Status: " + status);
    console.log("Due Date: " + dueDate);

    if (link) {
        console.log("Link: " + link);
    } else {
        console.log("Link: Not available");
    }

    console.log("----------------------------------------");
});