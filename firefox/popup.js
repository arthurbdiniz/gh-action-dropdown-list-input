document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

function saveOptions(event) {
    browser.storage.sync.set({
        popupStartTag: document.querySelector("#popupStartTag").value || "["
    });
    browser.storage.sync.set({
        popupEndTag: document.querySelector("#popupEndTag").value || "]"
    });

    restoreOptions();

    if(event) {
        event.preventDefault();
    }
}

function restoreOptions() {
    var popupStartTag = browser.storage.sync.get("popupStartTag");
    popupStartTag.then((res) => {
        if (!res.popupStartTag){
            restoreOptions();
        }
        document.querySelector("#popupStartTag").value = res.popupStartTag || "[";

    });

    var popupEndTag = browser.storage.sync.get("popupEndTag");
    popupEndTag.then((res) => {
        if (!res.popupEndTag){
            restoreOptions();
        }
        document.getElementById("popupEndTag").value = res.popupEndTag || "]";
    });
}