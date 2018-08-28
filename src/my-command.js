import React from 'react'
import {render, TextStyles, Page, View} from 'react-sketchapp'
import dom from 'sketch/dom'
export default function(context) {
  
  context.document.showMessage("It's alive 🙌");

    
  const doc = context.document;
  const pages = doc.pages()
  

  let TypographyStyles = []
  let DocumentColours = {};

  pages.forEach(page=>{
    log(page.name())
    
    // page styles
    if(String(page.name())==="Styles") {
      // get styles
      page.layers().forEach(layer=>{
       
        if(layer.class()===MSTextLayer) {
          
          // log(layer.font().fontName())
          // log(layer.fontSize())
          // log(layer.lineHeight())
          // log(layer.characterSpacing())
           //log(layer.style().textStyle().encodedAttributes() )
          log(layer.styleAttributes()["MSAttributedStringTextTransformAttribute"])

          TypographyStyles.push({
            name  : layer.name(),
            styles : {
              fontFamily : layer.font().fontName(),
              fontSize : layer.fontSize(),
              lineHeight : layer.lineHeight(),
              characterSpacing : layer.characterSpacing(),
              textTransform : layer.styleAttributes()["MSAttributedStringTextTransformAttribute"] //  null: none, 1: uppercase and 2 lowercase
            },
            alignments : ["left"]
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
         log(dom.Style.colorToString(json.colours[colour]))
        item.alignments.map((align,index)=> {

          typeStyles[`${item.name}/${colour}/${index+'_'+align}`] = {color: dom.Style.colorToString(json.colours[colour]), textAlign: align, ...item.styles }
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

let RenderPage =  context.document.addBlankPage()
RenderPage.name="Rendered Styles"
render(<View />, RenderPage);
}
