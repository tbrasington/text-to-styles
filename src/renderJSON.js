import dialog from '@skpm/dialog'
import path from '@skpm/path'
import fs from '@skpm/fs'
import jsonFormat from 'json-format'
import Sketch from 'sketch'

import {extractStyles, generateJSONStyles} from './generators'
  
function save(filename,fileContents){
    const targetFile = path.resolve(filename);
    fs.writeFileSync(targetFile, fileContents, 'utf8');
}

export default function(context) {
      
    const doc = context.document;
    const designTokens = extractStyles(context,true)
    const options =  ["Array","Object"]
    const textSaveSelection = Sketch.UI.getSelectionFromUser(
        "Would you like the text styles as an Array or Object",
        options
    );
    if(textSaveSelection[2]) {
        let textSaveMethod = true;
        if(options[textSaveSelection[1]]==="Object") textSaveMethod = false;
        if(options[textSaveSelection[1]]==="Array") textSaveMethod = true;

        const arranged = generateJSONStyles(designTokens,textSaveMethod)

        // Save the file
        dialog.showSaveDialog(doc, {defaultPath: "tokens.json", message: "Choose a folder to save your tokens"}, function(filename) {
            save(filename, jsonFormat(arranged));
        });
    }
}