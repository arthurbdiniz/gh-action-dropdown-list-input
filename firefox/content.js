function formatInputList(inputs, popupStartTag, popupEndTag) {
    for (let input of inputs) {
        if (input.id.startsWith("input_") && input.value.includes(popupStartTag) && input.value.includes(popupEndTag)) {
            var values = input.value.split(",");
            var selector = document.createElement("select");

            selector.name = input.id
            selector.classList = ["form-control form-select" ]

            values.forEach(function (option) {
                if (option.startsWith(popupStartTag) && option.endsWith(popupEndTag)) {
                    option = option.replace(popupStartTag, "").replace(popupEndTag, "")
                    input.value = option
                    optionHtml = `<option value="${option}" selected="selected">${option}</option>`
                }else{
                    optionHtml = `<option value="${option}">${option}</option>`
                }
                selector.insertAdjacentHTML("beforeend", optionHtml);
            });

            var parent = input.parentElement

            if (parent.getElementsByTagName("select").length == 0) {
                parent.appendChild(selector);
                input.type = "hidden"
            }

            selector.onchange = function() {
                var optionText = this.options[this.selectedIndex].text;
                var input = document.getElementById(this.name);

                input.value = optionText
            }
        }
    }
}

function queryInputList() {
    var inputs = document.getElementsByTagName("input");
    let count = 0
    let actionInputs = []

    let popupStartTag = "["
    let popupEndTag = "]"

    startTagStorageItem = browser.storage.sync.get("popupStartTag")
    startTagStorageItem.then((res) => {
        popupStartTag = res.popupStartTag
        endTagStorageItem = browser.storage.sync.get("popupEndTag")
        endTagStorageItem.then((res) => {
            popupEndTag = res.popupEndTag
            for (let input of inputs) {
                if (input.id.startsWith("input_")) {
                    count++
                    if (input.value.includes(popupStartTag) && input.value.includes(popupEndTag)) {
                        actionInputs.push(input)
                    }
                }
            }
            if (count == 0) {
                window.setTimeout(queryInputList, 250);
                return;
            }else {
                formatInputList(actionInputs, popupStartTag, popupEndTag)
            }
        });
    });
}


window.onclick = e => {
    if (e.target.tagName === "SUMMARY") {
        queryInputList()
    }
}