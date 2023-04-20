function translateDateToFrench(dateString) {
    var months = {
        "January": "janvier",
        "February": "février",
        "March": "mars",
        "April": "avril",
        "May": "mai",
        "June": "juin",
        "July": "juillet",
        "August": "août",
        "September": "septembre",
        "October": "octobre",
        "November": "novembre",
        "December": "décembre"
    };
    var parts = dateString.trim().split(" ");
    if (parts.length == 3 && parts[0] in months) {
        // input is in the "Month DD, YYYY" format
        var frenchMonth = months[parts[0]];
        var frenchDate = parts[1].replace(",", "");
        var frenchYear = parts[2];
    } else if (parts.length == 3 && parts[0].match(/^\d+$/)) {
        // input is in the "DD month YYYY" format
        var frenchMonth = months[parts[1]];
        var frenchDate = parts[0];
        var frenchYear = parts[2];
    } else {
        // invalid input format
        return null;
    }
    return frenchDate + " " + frenchMonth + " " + frenchYear;
}
