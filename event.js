var dicoTemplate = {
    "cite web": Ref.translate,
    "cite news": Ref.translate
}

function splitTemplates(txt) {
    var tab = txt.split('{{');
    var list = [tab[0]];
    for (var i = 1; i < tab.length; i++) {
        list.push('{{');
        var tab2 = tab[i].split('}}');
        list.push(tab2[0]);
        for (var j = 1; j < tab2.length; j++) {
            list.push('}}');
            list.push(tab2[j]);
        }
    }
    return list
}

function translate(txt) {
    var list = splitTemplates(txt);
    var stack = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i] === '{{') {
            stack.push(i);
        } else if (list[i] === '}}') {
            const start = stack.pop();
            const text = list.slice(start + 1, i);
            const translatedText = translateTemplate(text);
            list.splice(start, i - start + 1, translatedText);
            i = start + translatedText.length - 1;
        }
    }
    return list.join('');
}

function translateTemplate(txt) {
    var titre = left(left(left(right(txt, "{{"), "}}"), "|"), ":").trim().toLowerCase();
    if (titre in dicoTemplate) {
        return dicoTemplate[titre](txt);
    } else {
        console.log("error - template :'" + titre + "' not handled");
        return droite(txt, "}}")
    }
}


var valid = document.getElementById('valid');
var parle = document.getElementById('parle');

valid.addEventListener('click', function () {
    var txt = parle.value;
    document.getElementById('resultat').value = translate(txt);
}, false);

parle.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        valid.click();
    }
});