import { splitEvery } from "ramda";
import sketch, { Text } from "sketch/dom";
import { extractStyles, generateTextStyles } from "./generators";

export default function(context) {
  const designTokens = extractStyles(context, false);

  const textStyles = generateTextStyles(designTokens);

  // all the pages are present so we can render the styles
  if (designTokens.render) {
 

    let document = sketch.fromNative(context.document);
    const cachedStyles = document.sharedTextStyles;

    let stored_styles = [];

    // const l = textStyles.length;
    // for (let property = 0; property < l; property++) {
    //   let styleName = textStyles[property].name;
    //   let checkStyle = cachedStyles.find(item => item.name === styleName);
    //   if (typeof checkStyle === "object") {
    //     const layer = new Text({
    //       style: textStyles[property].style
    //     });

    //     checkStyle.style = layer.style;
    //     stored_styles.push(checkStyle);
    //   } else {
    //     stored_styles.push({
    //       name: styleName,
    //       style: textStyles[property].style
    //     });
    //   }
    // }

    splitEvery(100, textStyles).forEach(styleChunk => {
      styleChunk.forEach(style => {
        let styleName = style.name;
        let checkStyle = cachedStyles.find(item => item.name === styleName);
        if (typeof checkStyle === "object") {
          const layer = new Text({
            style: style.style
          });

          checkStyle.style = layer.style;
          stored_styles.push(checkStyle);
        } else {
          stored_styles.push({
            name: styleName,
            style: style.style
          });
        }
      });
    });

    // update the shared text styles with this array
    document.sharedTextStyles = stored_styles;

     

    context.document.showMessage(
      `${Object.keys(textStyles).length} styles added (${
        Object.keys(designTokens.typography).length
      } Text Styles * ${Object.keys(designTokens.colours).length} colours * ${
        Object.keys(designTokens.textAlignments).length
      } alignments) 🙌`
    );
  } else {
    context.document.showMessage(
      "No styles rendered. Check your document setup. Documentation here https://github.com/tbrasington/text-to-styles"
    );
  }
}
