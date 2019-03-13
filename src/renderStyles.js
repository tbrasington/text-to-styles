import React from 'react'

// import {render, TextStyles} from 'react-sketchapp'
//import {TypeLayout} from './typeSheet';
import  sketch from 'sketch/dom'

import {extractStyles,generateTextStyles} from './generators'


export default function(context) {


  const designTokens = extractStyles(context,false)
  const textStyles = generateTextStyles(designTokens);


  let document = sketch.fromNative(context.document)
  document.sharedTextStyles ={}
  Object.keys(textStyles).forEach(style=>{
  //  console.log(textStyles[style])

    document.sharedTextStyles.push({
        name: String(style),
        style: textStyles[style]
      })
  })

  // success message
  context.document.showMessage(`${Object.keys(textStyles).length} styles added (${Object.keys(designTokens.typography).length} Text Styles * ${Object.keys(designTokens.colours).length} colours * ${Object.keys(designTokens.textAlignments).length} alignments) 🙌`);

// let RenderPage =  context.document.addBlankPage()
// RenderPage.name="Rendered Styles"
// render(<TypeLayout colours={designTokens.colours}  typography={designTokens.typography}/>, RenderPage);

}
