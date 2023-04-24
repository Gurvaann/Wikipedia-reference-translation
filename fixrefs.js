function fixRefs(txt) {
    //txt : string
    //put a comma between two refs and moves the periods from before
    //the refs to after the refs
    //return : txt
    var tab = txt.split('> <');
    txt = tab.join('>{{,}}<');
    var tab = txt.split('><');
    txt = tab.join('>{{,}}<');
    var tab = txt.split('.<');
    for (var i = 1; i < tab.length; i++) {
        var tab2 = tab[i].split('</ref>')
        var jmax = 0;
        for (var j = 1; j < tab2.length; j++) {
            var t = tab2[j].split('{{,}}');
            if (t.length == 1 && jmax == 0) {
                jmax = j;
                tab2[j] = "." + tab2[j];
            }
        }
        tab[i] = tab2.join('</ref>');
    }
    return tab.join('<')
}