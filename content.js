function formatInputList(inputs) {
    for (let input of inputs) {
        if (input.id.startsWith("input_") && input.value.includes("[") && input.value.includes("]")) {
            var values = input.value.split(",");
            var selector = document.createElement('select');

            selector.name = input.id
            selector.classList = ["form-control form-select" ]

            values.forEach(function (option) {
                if (option.startsWith("[") && option.endsWith("]")) {
                    option = option.replace("[", "").replace("]", "")
                    optionHtml = `<option value="${option}" selected="selected">${option}</option>`
                }else{
                    optionHtml = `<option value="${option}">${option}</option>`
                }
                selector.insertAdjacentHTML('beforeend', optionHtml);
            });

            var parent = input.parentElement

            if (parent.getElementsByTagName("select").length == 0) {
                parent.appendChild(selector);
                input.type = "hidden"
            }

            selector.onchange = function() {
                var optionText = this.options[this.selectedIndex].text;
                var input = document.getElementById(this.name);

                input.value = input.value.replace("[", "").replace("]", "")
                input.value = input.value.replace(optionText, `[${optionText}]`)
            }
        }
    }
}

function queryInputList() {
    var inputs = document.getElementsByTagName("input");
    let count = 0
    let actionInputs = []

    for (let input of inputs) {
        if (input.id.startsWith("input_") && input.value.includes("[") && input.value.includes("]")) {
            actionInputs.push(input)
            count++
        }
    }
    if (count == 0) {
        window.setTimeout(queryInputList, 250);
        return;
    }else {
        formatInputList(actionInputs)
    }
}

window.onclick = e => {
    if (e.target.tagName === "SUMMARY") {
        queryInputList()
    }
}