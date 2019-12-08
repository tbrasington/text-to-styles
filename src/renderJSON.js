import dialog from "@skpm/dialog";
import path from "@skpm/path";
import fs from "@skpm/fs";
import jsonFormat from "json-format";
import Sketch from "sketch";

import { extractStyles, generateJSONStyles } from "./generators";

function save(filename, fileContents) {
  console.log(filename)

  const targetFile = path.resolve(filename);
  fs.writeFileSync(targetFile, fileContents, "utf8");
}

export default function(context) {
  const doc = context.document;

  // ok lets get the styles

  const designTokens = extractStyles(context, true);

  if (designTokens.render) {
    const options = ["Array", "Object"];
    const textSaveSelection = Sketch.UI.getInputFromUser(
      "Would you like the text styles as an Array or Object",
      {
        type: Sketch.UI.INPUT_TYPE.selection,
        possibleValues: options
      },
      (err, value) => {
        if (err) {
          // most likely the user canceled the input
          return;
        } else {
          if (value[2]) {
            let textSaveMethod = true;
            if (value === "Object") textSaveMethod = false;
            if (value === "Array") textSaveMethod = true;
            const arranged = generateJSONStyles(designTokens, textSaveMethod);

            // Save the file
            let saveDialog = dialog.showSaveDialog(
              doc,
              {
                defaultPath: "tokens.json",
                message: "Choose a folder to save your tokens"
              }
            ).then( result => {
               if(!result.cancelled) save(result.filePath, jsonFormat(arranged));
            });


          }
        }
      }
    );
  } else {
    context.document.showMessage('No styles rendered. Check your document setup. Documentation here https://github.com/tbrasington/text-to-styles');
  }
}
