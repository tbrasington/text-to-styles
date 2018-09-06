import React from 'react'

import {render, TextStyles} from 'react-sketchapp'
import {TypeLayout} from './typeSheet';
import {extractStyles,generateTextStyles} from './generators'


export default function(context) {


  const designTokens = extractStyles(context)
  const textStyles = generateTextStyles(designTokens);

  TextStyles.create({
    context: context,
    clearExistingStyles: true,
  }, textStyles);

  // success message
  context.document.showMessage(`${Object.keys(textStyles).length} styles added (${Object.keys(designTokens.typography).length} Text Styles * ${Object.keys(designTokens.colours).length} colours * ${Object.keys(designTokens.textAlignments).length} alignments) 🙌`);

let RenderPage =  context.document.addBlankPage()
RenderPage.name="Rendered Styles"
render(<TypeLayout colours={designTokens.colours}  typography={designTokens.typography}/>, RenderPage);
}
