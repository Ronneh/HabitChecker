self.addEventListener("install", (event) => {
    console.log("Service Worker installiert");
});

self.addEventListener("fetch", (event) => {
    // Hier könnte man später Cache hinzufügen
});
