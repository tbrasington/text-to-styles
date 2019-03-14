import  sketch, {Text} from 'sketch/dom'

import {extractStyles,generateTextStyles} from './generators'


export default function(context) {


  const designTokens = extractStyles(context,false)
  const textStyles = generateTextStyles(designTokens);

  let RenderPage =  context.document.addBlankPage()
  RenderPage.name="Rendered Styles";

  let document = sketch.fromNative(context.document)


  document.sharedTextStyles ={}
  let count=0, previousFrame = null;
  Object.keys(textStyles).forEach(style=>{
    
    document.sharedTextStyles.push({
        name: String(style),
        style: textStyles[style]
      });

      console.log ( (previousFrame !=null ? previousFrame.fra : 0) )
      let textLayer = new Text({
        text: String(style),
        parent : RenderPage,
        style: textStyles[style],
        frame : { x : 0 , y :  (previousFrame   !=null ? Math.ceil(previousFrame.frame.height + previousFrame.frame.y + 24) : 0)}
      });

      previousFrame = textLayer;
      count++;
  })

  // success message
  context.document.showMessage(`${Object.keys(textStyles).length} styles added (${Object.keys(designTokens.typography).length} Text Styles * ${Object.keys(designTokens.colours).length} colours * ${Object.keys(designTokens.textAlignments).length} alignments) 🙌`);

// render(<TypeLayout colours={designTokens.colours}  typography={designTokens.typography}/>, RenderPage);

}
