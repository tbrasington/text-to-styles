import React from 'react'
import {render, TextStyles, Page, View} from 'react-sketchapp'
import dom from 'sketch/dom'
import {TypeLayout} from './typeSheet';

export default function(context) {
      
  const doc = context.document;
  const pages = doc.pages()
  

  let TypographyStyles = []
  let DocumentColours = {};
  let textAlignments = [];

  pages.forEach(page=>{
   
    //  alignments
    if(String(page.name())==="Alignments") {
      page.layers().forEach(layer=>{ 
        //log(layer.name() + ' ' + layer.textAlignment()) 
        let alignment = 'left';
        if(layer.textAlignment()===4) alignment = 'left';
        if(layer.textAlignment()===2) alignment = 'center';
        if(layer.textAlignment()===1) alignment = 'right';
        textAlignments.push(alignment);
      });
    }

    // page styles
    if(String(page.name())==="Styles") {
      // get styles
      page.layers().forEach(layer=>{
       
        if(layer.class()===MSTextLayer) {
          
          // log(layer.font().fontName())
          // log(layer.fontSize())
          // log(layer.lineHeight())
          // log(layer.characterSpacing())
          // log(layer.style().textStyle().encodedAttributes() )
          //log(layer.styleAttributes()["MSAttributedStringTextTransformAttribute"])
          let textTransform = 'none';
          if(String(layer.styleAttributes()["MSAttributedStringTextTransformAttribute"])==='1') textTransform = 'uppercase'; //  null: none, 1: uppercase and 2 lowercase
          if(String(layer.styleAttributes()["MSAttributedStringTextTransformAttribute"])==='2') textTransform = 'lowercase'; 

          TypographyStyles.push({
            name  : layer.name(),
            styles : {
              fontFamily : layer.font().fontName(),
              fontSize : layer.fontSize(),
              lineHeight : layer.lineHeight(),
              characterSpacing : layer.characterSpacing(),
              textTransform : textTransform 
            },
            alignments : textAlignments
          })
        }
      });
    }

    // get colours
    if(String(page.name())==="Colours") {
      page.layers().forEach(layer=>{ 
        // log(layer.name())
        // log(layer.style().firstEnabledFill().color())
        DocumentColours[layer.name()] = layer.style().firstEnabledFill().color()
      })
    }

   
  })

  // log(TypographyStyles)
  // log(DocumentColours)
  const DesignSystemTokens = {
    colours: DocumentColours,
    typography : TypographyStyles
  }

  function generateTextStyles(json){
  
    let typeStyles={};

  
    json.typography.forEach(item=>{
      Object.keys(json.colours).forEach(colour=>{ 
        item.alignments.map((align,index)=> {
          // this splits at a slash and adds the adjustments for breakpoints after the alignment
          // assumption is that there is only one adjusment
          let name = item.name.split('/');
          typeStyles[`${name[0]}/${colour}/${index+'_'+align + (name.length>1  ? '/' + name[1] : '')}` ] = {color: dom.Style.colorToString(json.colours[colour]), textAlign: align, ...item.styles }
        })
      })
    })
  
    return typeStyles;
  }

  const textStyles = generateTextStyles(DesignSystemTokens);

  TextStyles.create({
    context: context,
    clearExistingStyles: true,
  }, textStyles);

  // success message
  context.document.showMessage(`${Object.keys(textStyles).length} styles added (${Object.keys(TypographyStyles).length} Text Styles * ${Object.keys(DocumentColours).length} colours * ${Object.keys(textAlignments).length} alignments) 🙌`);

let RenderPage =  context.document.addBlankPage()
RenderPage.name="Rendered Styles"
render(<TypeLayout colours={DesignSystemTokens.colours}  typography={DesignSystemTokens.typography}/>, RenderPage);
}
