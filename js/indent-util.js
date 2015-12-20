window.IndentUtil = (function() {
    function IndentUnit(key, val) {
        this.key = key;
        this.val = val;
    }

    var util = {
        INDENT_UNITS : {
            FOUR_SPACES: new IndentUnit('4s', '    '),
            TWO_SPACES: new IndentUnit('2s', '  '),
            TAB: new IndentUnit('1t', '\t')
        },
        getIndentUnit: function(key) {
            var indentUnit = {},
                units = this.INDENT_UNITS;
            for (var opt in units) {
                if (units.hasOwnProperty(opt)) {
                    indentUnit = units[opt];
                    if (indentUnit.key === key) {
                        return indentUnit.val;
                    }
                }
            }
            return null;
        }
    };

    return util;
}());
