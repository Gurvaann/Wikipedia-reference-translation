const glossaireRef = {
    "language": "langue",
    //"cite web": "Lien web",
    //"cite news": "Article",
    "url": "url",
    "date": "date",
    "access-date": "consulté le",
    "website": "site",
    "title": "titre",
    "author": "auteur",
    "work": "périodique",
    "first": "prénom",
    "last": "nom",
    "first1": "prénom1",
    "last1": "nom1",
    "first2": "prénom2",
    "last2": "nom2",
    "first3": "prénom3",
    "last3": "nom3",
    "publisher": "éditeur",
    "archive-url": "archive-url",
    "archive-date": "archive-date",
}

class Ref {
    constructor() {
        this.dico = {};
        this.tab = [];
    }

    static translate(str) {
        var ref = new Ref();
        ref.getElements(str);
        ref.translateDates();
        return ref.writeInFrench();
    }

    getElements(str) {
        this.tab = left(right(str, '{{'), '}}').split('|');
        this.mergeWikiLinks();
        for (var element of this.tab) {
            var tab2 = leftRight(element, "=");
            if (tab2[0].trim() in glossaireRef && tab2.length > 1) {
                this.dico[tab2[0].trim()] = tab2[1];
            } else {
                console.log("Error in ref - parameter : " + tab2[0] + " is not handled by the script");
            }
        }
        console.log(this.dico);
    }

    mergeWikiLinks() {
        for (var i = 0; i < this.tab.length; i++) {
            if (this.tab[i].includes(']]') && !thistab[i].includes('[[') && i > 1) {
                this.tab[i - 1] = this.tab[i - 1] + '|' + this.tab[i];
                this.tab[i] = "";
            }
        }
    }

    translateDates() {
        for (var key in this.dico) {
            if (key.includes("date")) {
                this.dico[key] = translateDateToFrench(this.dico[key]);
            }
        }
    }

    writeInFrench() {
        var str = "";
        for (var key in this.dico) {
            str = str + "|" + glossaireRef[key] + "=" + this.dico[key] + " ";
        }

        if (this.dico.language) {
            str = "|langue=en " + str;
        }

        if (this.dico.work) {
            return "{{Article " + str + "}}";
        }
        return "{{Lien web " + str + "}}";
    }
}

