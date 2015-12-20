var MAX_CHAR = 100000;

$(document).ready(function() {
    var $inputText = $('#input'),
        $outputText = $('#output');
    $(document).ready(function() {
        $('select').material_select();
    });
    $('#format-btn').click(function() {
        var indentUnitKey = $('#indent-unit-slt').val();
        var input = $inputText.val();
        var formattedLines = format(readLines(input), IndentUtil.getIndentUnit(indentUnitKey));
        $outputText.val(formattedLines);
    });
});

function readLines(str) {
    return str.split('\n');
}

function format(lines, indentUnit) {
    var signatureStack = [],
        originLine = '',
        trimmedLine = '',
        signature = '',
        isOpenAbsent = false,
        formattedLine = '',
        formattedResult = '';
    for (var i = 0; i < lines.length; i++) {
        originLine = lines[i];
        trimmedLine = originLine.trim();
        signature = trimmedLine.substring(3);
        if (isOpenVariable(trimmedLine)) {
            formattedLine = indentLine(trimmedLine, indentUnit, signatureStack.length);
            signatureStack.push(signature);
        } else if (isCloseVariable(trimmedLine)) {
            if (signature !== signatureStack.pop()) {
                isOpenAbsent = true;
            }
            formattedLine = indentLine(trimmedLine, indentUnit, signatureStack.length);
        } else {
            formattedLine = originLine;
        }
        formattedResult = formattedResult.concat(formattedLine.concat('\n'));
    }
    if (isOpenAbsent || signatureStack.length !== 0) {
        alert('Mustache format error!');
    }
    return formattedResult;
}

function isVariable(trimmedStr) {
    return StringUtil.startWith(trimmedStr, '{{') &&
            StringUtil.endWith(trimmedStr, '}}') &&
            StringUtil.occurrence(trimmedStr, '{{') === 1;
}

function isOpenVariable(trimmedStr) {
    return isVariable(trimmedStr) &&
            trimmedStr.indexOf('/') < 0;
}

function isCloseVariable(trimmedStr) {
    return isVariable(trimmedStr) &&
        trimmedStr.indexOf('/') > 0;
}

function indentLine(line, indentUnit, n) {
    var indented = line;
    for (var i = 0; i < n; i++) {
        indented = indentUnit.concat(indented);
    }
    return indented;
}
