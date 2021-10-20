
import dom from "sketch/dom";
import UI from "sketch/ui";

function convertSketchColourToRGBA(colour) {
  const red = Math.round(colour.red() * 255);
  const green = Math.round(colour.green() * 255);
  const blue = Math.round(colour.blue() * 255);
  return "rgba(" + red + "," + green + "," + blue + "," + colour.alpha() + ")";
}

export function extractStyles(context, convert) {
  const doc = context.document;
  const pages = doc.pages();

  // we need to check if we have all the pages
  let pagesExist = {
    alignments: false,
    colors: false,
    styles: false
  };

  // arrays and objects for our styles
  let TypographyStyles = [];
  let DocumentColours = {};
  let textAlignments = [];

  pages.forEach(page => {
    //  alignments
    if (String(page.name()) === "Alignments") {
      // page exists set to true
      pagesExist.alignments = true;

      page.layers().forEach(layer => {
        //log(layer.name() + ' ' + layer.textAlignment())
        let alignment = "left";
        if (layer.textAlignment() === 4) alignment = "left";
        if (layer.textAlignment() === 2) alignment = "center";
        if (layer.textAlignment() === 1) alignment = "right";
        textAlignments.push(alignment);
      });
    }

    // page styles
    if (String(page.name()) === "Styles") {
      // page exists set to true
      pagesExist.styles = true;

      // get styles
      page.layers().forEach(layer => {
        if (layer.class() === MSTextLayer) {
          // log(layer.font().fontName())
          // log(layer.fontSize())
          // log(layer.lineHeight())
          // log(layer.characterSpacing())
          // log(layer.style().textStyle().encodedAttributes() )
          //log(layer.styleAttributes()["MSAttributedStringTextTransformAttribute"])
          let textTransform = "none";

          if (
            String(
              layer.styleAttributes()[
                "MSAttributedStringTextTransformAttribute"
              ]
            ) === "1"
          )
            textTransform = "uppercase"; //  null: none, 1: uppercase and 2 lowercase
          if (
            String(
              layer.styleAttributes()[
                "MSAttributedStringTextTransformAttribute"
              ]
            ) === "2"
          )
            textTransform = "lowercase";

          // console.log( String(layer.name()) +  " " +  layer.font().fontName() + " "  + dom.fromNative(layer).style.fontWeight + " " +  dom.fromNative(layer).style.fontStyle  )
          // console.log("-----" )

          // fontFamily : dom.fromNative(layer).style.fontFamily ,
          // fontWeight : dom.fromNative(layer).style.fontWeight ,
          //console.log(dom.fromNative(layer).style.fontStyle)
         console.log(layer.sketchObject)

         function appKitWeightToCSSWeight(weight){
          return [100,100,100,200,300,400,500,500,600,700,800,900,900,900,900,900][weight]
        }
        var weight = NSFontManager.sharedFontManager().weightOfFont_(layer.font());
        log(appKitWeightToCSSWeight(weight)); 

          TypographyStyles.push({
            name: String(layer.name()),
            styles: {
              fontFamily: dom.fromNative(layer).style.fontFamily,
              fontWeight: convert
                ? dom.fromNative(layer).style.fontWeight * 100
                : dom.fromNative(layer).style.fontWeight,
              fontSize: layer.fontSize() + (convert ? "px" : ""),
              lineHeight: layer.lineHeight() + (convert ? "px" : ""),
              fontStyle:
                dom.fromNative(layer).style.fontStyle != undefined
                  ? dom.fromNative(layer).style.fontStyle
                  : "normal",
              paragraphSpacing: dom.fromNative(layer).style.paragraphSpacing,
              ...(convert && {
                letterSpacing: String(layer.characterSpacing() / 10 + "em")
              }),
              ...(!convert && { kerning: layer.characterSpacing() }),
              textTransform: textTransform,
              borders: dom.fromNative(layer).style.borders || []
            },
            alignments: textAlignments,
            adjustments: []
          });
        }
      });
    }

    // get colours
    if (String(page.name()) === "Colours" || String(page.name()) === "Colors") {
      // page exists set to true
      pagesExist.colors = true;

      DocumentColours = {};
      page.layers().forEach(layer => {
        DocumentColours[layer.name()] = convert
          ? convertSketchColourToRGBA(
              layer
                .style()
                .firstEnabledFill()
                .color()
            )
          : layer
              .style()
              .firstEnabledFill()
              .color();
      });
    }
  });


  let allPagesHere = true;
  let messages = [];

  // first check for pages
  if (!pagesExist.alignments) {
    messages.push('Your document is missing the page named "Alignments".');
    allPagesHere = false;
  }

  if (!pagesExist.colors) {
    messages.push('Your document is missing the page named "Colors". ');
    allPagesHere = false;
  }

  if (!pagesExist.styles) {
    messages.push('Your document is missing the page named "Styles".');
    allPagesHere = false;
  }

  // now that we have checked for pages, lets see if there is anything in them
  if (pagesExist.alignments && textAlignments.length === 0) {
    messages.push("Your alignments page has no alignments in it.");
    allPagesHere = false;
  }

  if (pagesExist.colors && Object.keys(DocumentColours).length === 0) {
    messages.push("Your colors page has no colors in it.");
    allPagesHere = false;
  }

  if (pagesExist.styles && TypographyStyles.length === 0) {
    messages.push("Your styles page has no styles in it.");
    allPagesHere = false;
  }

  let messageString = "";
  messages.forEach(message => {
    messageString += message + "\n";
  });

  if (!allPagesHere) UI.alert("Unable to render styles", messageString);

  const DesignSystemTokens = {
    colours: DocumentColours,
    typography: TypographyStyles,
    textAlignments: textAlignments,
    render: allPagesHere
  };

  return DesignSystemTokens;
}

export function generateTextStyles(json) {
  // can we calculate this beforehand?
  let typeStyles = new Array();

  json.typography.forEach(item => {
    Object.keys(json.colours).forEach(colour => {
      item.alignments.map((align, index) => {
        // this splits at a slash and adds the adjustments for breakpoints after the alignment
        // assumption is that there is only one adjusment
        let name = item.name.split("/");
        typeStyles.push({
          name: `${name[0]}/${colour}/${index +
            "_" +
            align +
            (name.length > 1 ? "/" + name[1] : "")}`,
          style: {
            textColor: dom.Style.colorToString(json.colours[colour]),
            alignment: align,
            ...item.styles
          }
        });
      });
    });
  });

  return typeStyles;
}

function checkMatch(baseStyle, newStyle, prop) {
  let value = true;

  // for now we are just going off the previous style. As this would need to check
  // every prop across every adjustment :/
  if (JSON.stringify(baseStyle[prop]) === JSON.stringify(newStyle[prop])) {
    // very primitive and breaks if order is out of sync
    value = false;
  }

  //log( prop + ' ' + baseStyle[prop] + ' ----- ' + prop  + ' ' +newStyle[prop] + '  value ' + value)

  return value;
}

export function generateJSONStyles(json, arrayFormat) {
  let typeStyles = {};
  let refinedBreakpoints = [];
  //log(json.typography)
  json.typography.forEach(item => {
    let name = item.name.split("/");
    if (!typeStyles[name[0]]) {
      typeStyles[name[0]] = {
        name: name[0],
        styles: item.styles,
        alignments: item.alignments,
        adjustments: []
      };
    } else {
      let currentStyle = item.styles;
      //let previousStyle = typeStyles[name[0]].styles
      // work out previous style
      const adjustmentLength = typeStyles[name[0]].adjustments.length;
      refinedBreakpoints[adjustmentLength] = { name: name[1], styles: {} };

      // if(adjustmentLength>0){
      //     previousStyle = typeStyles[name[0]].adjustments[adjustmentLength-1]
      // }

      //previousStyle,
      Object.keys(currentStyle).map(checked => {
        if (checkMatch(typeStyles[name[0]].styles, currentStyle, checked)) {
          refinedBreakpoints[adjustmentLength].styles[checked] =
            currentStyle[checked];
        }
      });

      typeStyles[name[0]].adjustments.push(
        refinedBreakpoints[adjustmentLength]
      );
    }
  });

  // finally merge colours back in and return text to an array
  let formattedTokens = {
    colours: json.colours,
    typography: arrayFormat
      ? Object.keys(typeStyles).map(function(key) {
          return typeStyles[key];
        })
      : typeStyles
  };
  return formattedTokens;
}
