document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

function saveOptions(e) {
    browser.storage.sync.set({
        popupStartTag: document.querySelector("#popupStartTag").value ? document.querySelector("#popupStartTag").value : '['
    });
    browser.storage.sync.set({
        popupEndTag: document.querySelector("#popupEndTag").value ? document.querySelector("#popupEndTag").value : ']'
    });
    restoreOptions();
    e.preventDefault();
}

function restoreOptions() {
    var popupStartTag = browser.storage.sync.get('popupStartTag');
    popupStartTag.then((res) => {
        if (!res.popupStartTag){
            browser.storage.sync.set({
                popupStartTag: '['
            });
        }
        document.querySelector("#popupStartTag").value = res.popupStartTag || '[';

    });

    var popupEndTag = browser.storage.sync.get('popupEndTag');
    popupEndTag.then((res) => {
        if (!res.popupEndTag){
            browser.storage.sync.set({
                popupEndTag: ']'
            });
        }
        document.getElementById("popupEndTag").value = res.popupEndTag || ']';
    });
}