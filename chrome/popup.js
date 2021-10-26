document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

function saveOptions(e) {
    chrome.storage.sync.set({
        "popupStartTag": document.querySelector("#popupStartTag").value ? document.querySelector("#popupStartTag").value : '['
    });

    chrome.storage.sync.set({
        "popupEndTag": document.querySelector("#popupEndTag").value ? document.querySelector("#popupEndTag").value : ']'
    });

    restoreOptions();
    e.preventDefault();
}

function restoreOptions() {
    chrome.storage.sync.get(["popupStartTag", "popupEndTag"], function(items){
        if (!items["popupStartTag"]){
            chrome.storage.sync.set({
                popupStartTag: '['
            });
        }
        document.querySelector("#popupStartTag").value = items["popupStartTag"] || '[';

        if (!items["popupEndTag"]){
            chrome.storage.sync.set({
                popupEndTag: ']'
            });
        }
        document.querySelector("#popupEndTag").value = items["popupEndTag"] || ']';

    });
}