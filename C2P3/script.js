function performSearch() {
    var inputText = document.getElementById("inputText").value;
    var searchText = document.getElementById("searchText").value;
    var resultText = document.getElementById("outputText");

    try {
        var regex = new RegExp(searchText, "g");
        var matches = inputText.match(regex);
        resultText.value = matches ? matches.join("\n") : "No matches found";
    }
    catch (error) {
        resultText.value = "Invalid regular expression";
    }
}

function performReplace() {
    var inputText = document.getElementById("inputText").value;
    var searchText = document.getElementById("searchText").value;
    var replaceText = document.getElementById("replaceText").value;
    var resultText = document.getElementById("outputText");

    try {
        var regex = new RegExp(searchText, "g");
        resultText.value = inputText.replace(regex, replaceText);
    }
    catch (error) {
        resultText.value = "Invalid regular expression";
    }
}

function performFormat() {
    var inputText = document.getElementById("inputText").value;
    var resultText = document.getElementById("outputText");

    // Capitalize first letter of each word
    resultText.value = inputText.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}
// Root script placeholder — page-specific scripts live in their folders.
