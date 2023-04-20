function leftRight(str, sep, n = 1) {
    //str : string
    //sep : string
    //n : int but not 0
    //split the string str the nth time where the separator sep is found for the n-th time
    // and return both the left and right parts
    //return : list with two strings
    if (str == undefined) {
        return undefined
    }
    tab = str.split(sep);
    if (n > 0) {
        var left = tab.slice(0, n);
        var right = tab.slice(n, tab.length);
    } else {
        var left = tab.slice(0, tab.length + n);
        var right = tab.slice(tab.length + n, tab.length);
    }
    return [left.join(sep), right.join(sep)]
}

function left(str, sep, n = 1) {
    var a = leftRight(str, sep, n);
    return a[0];
}

function right(str, sep, n = 1) {
    var a = leftRight(str, sep, n);
    return a[1];
}