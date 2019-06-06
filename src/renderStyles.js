import  sketch, {Text} from 'sketch/dom'
import {extractStyles,generateTextStyles} from './generators'


export default function(context) {

 

  const designTokens = extractStyles(context,false)
  const textStyles = generateTextStyles(designTokens);

  //console.log(textStyles)

  let RenderPage =  context.document.addBlankPage();
  RenderPage.name="Rendered Styles";

  let document = sketch.fromNative(context.document);

  // reset styles
  // not sure how to clear up unused styles, maybe we compare the arrays at the end
  //document.sharedTextStyles = [];
  let stored_styles = []
 
  Object.keys(textStyles).forEach(style=>{
    
    let styleName = String(style);

    let checkStyle = document.sharedTextStyles.find((item) => item.name === styleName)
     
       if(typeof(checkStyle)==='object'){

        var layer = new Text({
          style: textStyles[style]
        })
        
        checkStyle.style = layer.style;
        stored_styles.push(checkStyle)

      } else {
        stored_styles.push({
          name: String(style),
          style: textStyles[style]
        });
      }
  })

  // update the shared text styles with this array
  document.sharedTextStyles = stored_styles;

  let previousFrame = null;
    // now make a page 
    document.sharedTextStyles.forEach(style => {
      let textLayer = new Text({ 
        text: style.name,
        parent : RenderPage,
        frame : { x : 0 , y :  (previousFrame   !=null ? Math.ceil(previousFrame.frame.height + previousFrame.frame.y + 24) : 0)},
        sharedStyleId: style.id,
        style :style.style
      });
 
      textLayer.name = style.name;
      previousFrame = textLayer;
    });

  // success message
  context.document.showMessage(`${Object.keys(textStyles).length} styles added (${Object.keys(designTokens.typography).length} Text Styles * ${Object.keys(designTokens.colours).length} colours * ${Object.keys(designTokens.textAlignments).length} alignments) 🙌`);

}