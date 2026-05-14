const notifyBtn = document.getElementById("notifyBtn");
const notifyPopup = document.getElementById("notifyPopup");
const closeNotify = document.getElementById("closeNotify");


notifyBtn.addEventListener("click", function () {
    notifyPopup.classList.remove("hidden");
});

closeNotify.addEventListener("click", function () {
    notifyPopup.classList.add("hidden");
});
