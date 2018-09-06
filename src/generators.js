import dom from 'sketch/dom'


function convertSketchColourToRGBA(colour) {
    const red = Math.round(colour.red() * 255);
    const green = Math.round(colour.green() * 255);
    const blue = Math.round(colour.blue() * 255);
    return 'rgba(' + red + ',' + green + ',' + blue + ',' + colour.alpha() + ')';
}

export function extractStyles(context,convertColour) {
      
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
              name  : String(layer.name()),
              styles : {
                fontFamily : String(layer.font().fontName()),   
                fontSize : layer.fontSize(),
                lineHeight : layer.lineHeight(),
                characterSpacing : Number(layer.characterSpacing()),
                textTransform : textTransform 
              },
              alignments : textAlignments,
              adjustments : []
            })
          }
        });
      }
  
      // get colours
      if(String(page.name())==="Colours") {
        page.layers().forEach(layer=>{ 
          DocumentColours[layer.name()] = (convertColour ? convertSketchColourToRGBA(layer.style().firstEnabledFill().color()) : layer.style().firstEnabledFill().color())
        })
      }
    });

    const DesignSystemTokens = {
        colours: DocumentColours,
        typography : TypographyStyles,
        textAlignments : textAlignments
    }

    return  DesignSystemTokens
}



export function generateTextStyles(json){
  
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

function checkMatch(prevStyle, newStyle, prop) {
    let value = false;
    if (prevStyle === null) {
        value =  true
    }
    if (JSON.stringify(prevStyle[prop]) !== JSON.stringify(newStyle[prop])) { // very primitive and breaks if order is out of sync 
        value =  true       
    } 
    return value;
}

export function generateJSONStyles(json){
  
    let typeStyles={};
    let refinedBreakpoints = []
    //log(json.typography)
    json.typography.forEach((item)=>{
        let name = item.name.split('/');
        if(!typeStyles[name[0]]) {
             
            typeStyles[name[0]] = {
                styles : item.styles,
                alignments : item.alignments,
                adjustments : []
            }

        } else {
            
            let currentStyle = item.styles
            let previousStyle = typeStyles[name[0]].styles
            // work out previous style
            log(typeStyles[name[0]].adjustments.length)
            const adjustmentLength = typeStyles[name[0]].adjustments.length;
            refinedBreakpoints[adjustmentLength] = { name : name[1], styles:{}}
            
            if(  adjustmentLength>0){
                previousStyle = typeStyles[name[0]].adjustments[adjustmentLength-1]
            } 
            Object.keys(currentStyle).map(checked => {
                
                if(checkMatch(
                  previousStyle,
                  currentStyle,
                  checked
                ) ) {
                  refinedBreakpoints[adjustmentLength].styles[checked] = currentStyle[checked];
                }
              });

            typeStyles[name[0]].adjustments.push(refinedBreakpoints[adjustmentLength])
        }
    })
  
    return typeStyles;
}