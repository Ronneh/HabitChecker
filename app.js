const habitContainer = document.getElementById("habitContainer");
const newHabitBtn = document.getElementById("newHabitBtn");

newHabitBtn.addEventListener("click", () => {
    const name = prompt("Name des Habits?");
    const color = prompt("Farbe (z. B. red, #2196f3)?");

    if (name) {
        createHabit(name, color || "#ddd");
    }
});

function createHabit(name, color) {
    const habitDiv = document.createElement("div");
    habitDiv.classList.add("habit");
    habitDiv.style.borderLeft = `8px solid ${color}`;

    const title = document.createElement("div");
    title.classList.add("habit-title");
    title.textContent = name;

    const list = document.createElement("ul");
    list.classList.add("entry-list");

    const button = document.createElement("button");
    button.classList.add("add-entry-btn");
    button.textContent = "Eintrag hinzufuegen";

    button.addEventListener("click", () => {
        const now = new Date();
        const formatted = formatDate(now);
        const li = document.createElement("li");
        li.textContent = formatted;
        list.prepend(li);
    });

    habitDiv.appendChild(title);
    habitDiv.appendChild(list);
    habitDiv.appendChild(button);
    habitContainer.appendChild(habitDiv);
}

function formatDate(date) {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const s = String(date.getSeconds()).padStart(2, "0");
    return `${d}.${m}.${y} ${h}:${min}:${s}`;
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(() => {
        console.log("Service Worker registriert");
    });
}

// Beim Laden gespeicherte Habits anzeigen
window.addEventListener("load", () => {
    const data = JSON.parse(localStorage.getItem("habits")) || [];
    data.forEach(habit => {
        createHabit(habit.name, habit.color, habit.entries);
    });
});

function createHabit(name, color, entries = []) {
    const habitDiv = document.createElement("div");
    habitDiv.classList.add("habit");
    habitDiv.style.borderLeft = `8px solid ${color}`;

    const title = document.createElement("div");
    title.classList.add("habit-title");
    title.textContent = name;

    const list = document.createElement("ul");
    list.classList.add("entry-list");

    entries.forEach(e => {
        const li = document.createElement("li");
        li.textContent = e;
        list.appendChild(li);
    });

    const button = document.createElement("button");
    button.classList.add("add-entry-btn");
    button.textContent = "Eintrag hinzufügen";

    button.addEventListener("click", () => {
        const now = new Date();
        const formatted = formatDate(now);
        const li = document.createElement("li");
        li.textContent = formatted;
        list.prepend(li);

        saveHabits();
    });

    habitDiv.appendChild(title);
    habitDiv.appendChild(list);
    habitDiv.appendChild(button);
    habitContainer.appendChild(habitDiv);

    saveHabits();
}

function saveHabits() {
    const allHabits = [];
    document.querySelectorAll(".habit").forEach(habitDiv => {
        const name = habitDiv.querySelector(".habit-title").textContent;
        const color = habitDiv.style.borderLeft.split(" ")[2]; // Farbe aus CSS ziehen
        const entries = Array.from(habitDiv.querySelectorAll("li")).map(li => li.textContent);

        allHabits.push({ name, color, entries });
    });
    localStorage.setItem("habits", JSON.stringify(allHabits));
}
