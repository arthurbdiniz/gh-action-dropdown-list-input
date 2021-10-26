document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

function saveOptions(event) {
    chrome.storage.sync.set({
        "popupStartTag": document.querySelector("#popupStartTag").value || '['
    });

    chrome.storage.sync.set({
        "popupEndTag": document.querySelector("#popupEndTag").value || ']'
    });

    restoreOptions();

    if (event) {
        event.preventDefault();
    }
}

function restoreOptions() {
    chrome.storage.sync.get(["popupStartTag", "popupEndTag"], function(items){
        if (!items["popupStartTag"] || !items["popupEndTag"]){
            saveOptions()
        }

        document.querySelector("#popupStartTag").value = items["popupStartTag"] || '[';
        document.querySelector("#popupEndTag").value = items["popupEndTag"] || ']';

    });
}