import dialog from '@skpm/dialog'
import path from '@skpm/path'
import fs from '@skpm/fs'
import jsonFormat from 'json-format'
import {extractStyles, generateJSONStyles} from './generators'
  
function save(filename,fileContents){
    const targetFile = path.resolve(filename);
    fs.writeFileSync(targetFile, fileContents, 'utf8');
}

export default function(context) {
      
    const doc = context.document;
    const designTokens = extractStyles(context,true)
    const arranged = generateJSONStyles(designTokens)
    log(arranged)

    // Save the file
//     dialog.showSaveDialog(doc, {defaultPath: "tokens.json", message: "Choose a folder to save your tokens"}, function(filename) {
//         save(filename, jsonFormat(designTokens))
//     })
}