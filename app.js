const habitOverview = document.getElementById("habitOverview");
const habitDetail = document.getElementById("habitDetail");
const habitList = document.getElementById("habitList");
const entryList = document.getElementById("entryList");
const habitTitle = document.getElementById("habitTitle");

const newHabitBtn = document.getElementById("newHabitBtn");
const backBtn = document.getElementById("backBtn");
const addEntryBtn = document.getElementById("addEntryBtn");

let habits = JSON.parse(localStorage.getItem("habits")) || [];
let activeHabit = null;

// ------------------
// Homepage
// ------------------
function renderHabits() {
    habitList.innerHTML = "";
    habits.forEach((habit, index) => {
        const card = document.createElement("div");
        card.className = "habit-card";
        card.style.background = habit.color;
        card.textContent = habit.name;
        card.onclick = () => openHabit(index);
        habitList.appendChild(card);
    });
}

newHabitBtn.onclick = () => {
    const name = prompt("Name of the habit:");
    if (!name) return;
    const color = prompt("Color (e.g. red or #3498db):", "#3498db");
    habits.push({ name, color, entries: [] });
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
};

// ------------------
// Detail page
// ------------------
function openHabit(index) {
    activeHabit = index;
    habitTitle.textContent = habits[index].name;
    renderEntries();

    habitOverview.classList.remove("active");
    habitDetail.classList.add("active");
}

function renderEntries() {
    entryList.innerHTML = "";
    habits[activeHabit].entries.forEach((entry, i) => {
        const li = document.createElement("li");
        li.classList.add("entry");

        const span = document.createElement("span");
        span.textContent = entry;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.onclick = () => {
            habits[activeHabit].entries.splice(i, 1); // remove from array
            localStorage.setItem("habits", JSON.stringify(habits)); // save
            renderEntries(); // re-render
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);
        entryList.appendChild(li);
    });
}

addEntryBtn.onclick = () => {
    const now = new Date();
    const timestamp = now.toLocaleDateString("de-DE") + " " + now.toLocaleTimeString("de-DE");
    habits[activeHabit].entries.push(timestamp);
    localStorage.setItem("habits", JSON.stringify(habits));
    renderEntries();
};

backBtn.onclick = () => {
    habitDetail.classList.remove("active");
    habitOverview.classList.add("active");
};

// ------------------
// Initialization
// ------------------
renderHabits();
