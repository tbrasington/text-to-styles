import  sketch, {Text} from 'sketch/dom'
import {extractStyles,generateTextStyles} from './generators'


export default function(context) {


  const designTokens = extractStyles(context,false)
  const textStyles = generateTextStyles(designTokens);

  let RenderPage =  context.document.addBlankPage()
  RenderPage.name="Rendered Styles";

  let document = sketch.fromNative(context.document)

  // reset styles
  document.sharedTextStyles ={}

  let previousFrame = null;
  Object.keys(textStyles).forEach(style=>{
    
    document.sharedTextStyles.push({
        name: String(style),
        style: textStyles[style]
      });

      // attach the style to the render
      let sharedStyles = context.document.documentData().layerTextStyles().sharedStyles();
      let latestStyle = sharedStyles[sharedStyles.length-1]

      let stylename = String(style);
      let textLayer = new Text({ 
        text: style.toString(),
        parent : RenderPage,
        style: textStyles[style],
        frame : { x : 0 , y :  (previousFrame   !=null ? Math.ceil(previousFrame.frame.height + previousFrame.frame.y + 24) : 0)},
        sharedStyleId: latestStyle.objectID()
      });

      textLayer.name = stylename;
      previousFrame = textLayer;
  })

  // success message
  context.document.showMessage(`${Object.keys(textStyles).length} styles added (${Object.keys(designTokens.typography).length} Text Styles * ${Object.keys(designTokens.colours).length} colours * ${Object.keys(designTokens.textAlignments).length} alignments) 🙌`);

}
