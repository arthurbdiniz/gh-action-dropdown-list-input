function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

window.onclick = e => {
    if (e.target.tagName === "SUMMARY") {
        sleep(1000).then(() => {
            var inputs = document.getElementsByTagName("input");
            var i = inputs.length;

            while (i--) {
                if (inputs[i].id.startsWith("input_") && inputs[i].value.includes("[") && inputs[i].value.includes("]")) {
                    var values = inputs[i].value.split(",")

                    var selector = document.createElement('select');
                    selector.name = inputs[i].id
                    selector.classList = ["form-control form-select" ]
                    values.forEach(function (option, index) {
                        if (option.startsWith("[") && option.endsWith("]")) {
                            option = option.replace("[", "").replace("]", "")
                            optionHtml = `<option value="${option}" selected="selected">${option}</option>`
                        }else{
                            optionHtml = `<option value="${option}">${option}</option>`
                        }
                        selector.insertAdjacentHTML('beforeend', optionHtml);
                    });

                    var parent = inputs[i].parentElement

                    if (parent.getElementsByTagName("select").length == 0) {
                        parent.appendChild(selector);
                        inputs[i].type = "hidden"
                    }

                    selector.onchange = function() {
                        var optionText = this.options[this.selectedIndex].text;
                        var input = document.getElementById(this.name);

                        input.value = input.value.replace("[", "").replace("]", "")
                        input.value = input.value.replace(optionText, `[${optionText}]`)
                    }
                }
            }
        });
    }
}