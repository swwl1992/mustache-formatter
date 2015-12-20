window.StringUtil = (function() {
    function StringUtil() {}

    StringUtil.prototype.isString = function(str) {
        return typeof str === 'string' || str instanceof String;
    };

    StringUtil.prototype.startWith = function(str, head){
        if (!this.isString(str)) {
            return false;
        }
        return str.indexOf(head) === 0;
    };

    StringUtil.prototype.endWith = function(str, tail) {
        if (!this.isString(str)) {
            return false;
        }
        return str.length >= tail.length &&
            str.substr(str.length - tail.length) == tail;
    };

    StringUtil.prototype.occurrence = function(str, substr) {
        return str.split(substr).length - 1;
    };

    return new StringUtil();
}());