/*
*
* support: qazomardok@gmail.com
*
*/

#targetengine "session";



with (app) {
    if (1 == 1) {
        if (typeof advFinder !== 'undefined') {
            advFinder.close();
        }



        var variablesFile = activeScript.path + "/.assets/variables";

        var variablesFile = new File(variablesFile);
        if (variablesFile.exists) {
            eval("//@include \'" + variablesFile + "\';");
        } else {
            alert("Cant open variables file!");
            exit();
        }

        if (documents.length < 1) {
            alert(langNoDoc);
            exit();
        }

        eval("//@include \'" + activeScript.path + "/.assets/functions" + "\';");


        var selectedText = "";
        if (typeof selection[0] !== "undefined") {

            var selectedText = app.selection[0].constructor.name;
            var currentSelection = app.selection[0].constructor.name;

        } else {
            var currentSelection = "";

        }

        switch (currentSelection) {
            case "TextFrame":
                var currentStory = app.selection[0].parentStory;
            case "InsertionPoint":
                var currentStory = app.selection[0].parentStory;
                break;
            case "TextStyleRange":
            case "Word":
            case "Text":
                selectedText = app.selection[0].contents;
                var currentStory = app.selection[0].parentStory;
                break;
            default:
                var currentStory = "";
                var selectedText = "";
                break;
        }


        app.findTextPreferences.findWhat = selectedText;
        app.changeTextPreferences.changeTo = selectedText;

        eval("//@include \'" + activeScript.path + "/.assets/form" + "\';");
        eval("//@include \'" + activeScript.path + "/.assets/listeners" + "\';");

        advFinder.show();
    }

    function keydown(e) {

        switch (e.keyName) {
            case "Escape":
                advFinder.close();
                break;
            case "Enter":
                if (checkGoReplaceByEnter.value == true) {
                    replaceAll();
                } else {
                    findNext();
                }
                break;
        }
        return;
    }

}
