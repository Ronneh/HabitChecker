self.addEventListener("install", (event) => {
    console.log("Service Worker installiert");
});

self.addEventListener("fetch", (event) => {
    // Hier k�nnte man sp�ter Cache hinzuf�gen
});
