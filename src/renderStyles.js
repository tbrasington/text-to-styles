import sketch, { Text } from "sketch/dom";
import { extractStyles, generateTextStyles } from "./generators";

export default function(context) {
  console.log('starting')
  const designTokens = extractStyles(context, false);
  console.log('tokens')
  const textStyles = generateTextStyles(designTokens);
  console.log('text style')
 

  // all the pages are present so we can render the styles
  if (designTokens.render) {
    let RenderPage = context.document.addBlankPage();
    RenderPage.name = "Rendered Styles";
 
    let document = sketch.fromNative(context.document);

    // reset styles
    // not sure how to clear up unused styles, maybe we compare the arrays at the end
    //document.sharedTextStyles = [];
    let stored_styles = [];

   // for (const property in textStyles) {
      const l = 100;// textStyles.length
      for (let property = 0; property < l; property++) {
      let styleName = textStyles[property].name;
        console.log(styleName)
      let checkStyle = document.sharedTextStyles.find(
        item => item.name === styleName
      );
      if (typeof checkStyle === "object") {
        const layer = new Text({
          style: textStyles[property].style
        });

        checkStyle.style = layer.style;
        stored_styles.push(checkStyle);

      } else {
        stored_styles.push({
          name: styleName,
          style: textStyles[property].style
        });
      }
    }

    // update the shared text styles with this array
    document.sharedTextStyles = stored_styles;
 
    let previousFrame = null;
    // now make a page 

      const stl = 100;//document.sharedTextStyles.length
      for (let property = 0; property < stl; property++) {
 
      let textLayer = new Text({
        text: document.sharedTextStyles[property].name,
        parent: RenderPage,
        frame: {
          width : document.sharedTextStyles[property].name.length * document.sharedTextStyles[property].style.fontSize,
          height: document.sharedTextStyles[property].style.lineHeight,
          x: 0,
          y:
            previousFrame != null
              ? Math.ceil(
                  previousFrame.frame.height + previousFrame.frame.y + 24
                )
              : 0
        },
        sharedStyleId: document.sharedTextStyles[property].id,
        style: document.sharedTextStyles[property].style
      });
     
      textLayer.name = document.sharedTextStyles[property].name;
      previousFrame = textLayer;
    };

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
