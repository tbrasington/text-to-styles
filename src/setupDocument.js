import { Text, ShapePath, Style } from "sketch/dom";

export default function(context) {
  
    // Remove exisiting Pages
    for (let index = context.document.pages().length - 1; index >= 0; index -= 1) {
 
            context.document.documentData().removePageAtIndex(index);
        
      }

    // Add pages
    const StylesPage = context.document.addBlankPage();
    StylesPage.name = "Styles";
 
    const AlignmentsPage = context.document.addBlankPage();
    AlignmentsPage.name = "Alignments";
 
    const ColorsPage = context.document.addBlankPage();
    ColorsPage.name = "Colors";


    // Add Text to Styles Page
    const textLayer1 = new Text({
        text: "Style 1",
        frame: {
          width: 100,
          height: 32,
          x: 0,
          y: 0
        },
        style: {
            fontFamily: 'Helvetica',
            fontWeight: 8,
            fontSize: 24,
            lineHeight: 24 * 1.5,
            fontStyle: "normal",
            paragraphSpacing:  24*1.5,
            kerning : 0
        },
        parent : StylesPage
      });
      textLayer1.name = "Style 1";

      const textLayer2 = new Text({
        text: "Style 2",
        frame: {
          width: 100,
          height: 32,
          x: 0,
          y: textLayer1.frame.height + 24
        },
        style: {
            fontFamily: 'Helvetica',
            fontWeight: 4,
            fontSize: 16,
            lineHeight: 16 * 1.5,
            fontStyle: "normal",
            paragraphSpacing:  16*1.5,
            kerning : 0
        },
        parent : StylesPage
      });
      textLayer2.name = "Style 2";

    // Add Alignments
    const alignmentLayerLeft = new Text({
      text: "Left",
      frame: {
        width: 100,
        height: 32,
        x: 0,
        y: 0
      },
      style: {
          fontFamily: 'Helvetica',
          fontWeight: 4,
          fontSize: 16,
          lineHeight: 16 * 1.5,
          fontStyle: "normal",
          paragraphSpacing:  16*1.5,
          kerning : 0,
          alignment : 'left'
      },
      parent : AlignmentsPage
    });
    alignmentLayerLeft.name = "Left";

    const alignmentLayerRight = new Text({
      text: "Right",
      frame: {
        width: 100,
        height: 32,
        x: 0,
        y: 0
      },
      style: {
          fontFamily: 'Helvetica',
          fontWeight: 4,
          fontSize: 16,
          lineHeight: 16 * 1.5,
          fontStyle: "normal",
          paragraphSpacing:  16*1.5,
          kerning : 0,
          alignment : 'right'
      },
      parent : AlignmentsPage
    });
    alignmentLayerLeft.name = "Right";

    // Add Colors
    new ShapePath({
      name: 'Black',
      shapeType: ShapePath.ShapeType.Oval,
      parent : ColorsPage,
      frame : {
        width: 100,
        height: 100,
        x: 0, 
        y : 0
      },
      style : {
        fills : [
          {
            color: '#111111',
            fillType: Style.FillType.Color,
          }
        ],
        borders : []
      }
    });

    new ShapePath({
      name: 'Red',
      shapeType: ShapePath.ShapeType.Oval,
      parent : ColorsPage,
      frame : {
        width: 100,
        height: 100,
        x: 124, 
        y : 0
      },
      style : {
        fills : [
          {
            color: '#cc0000',
            fillType: Style.FillType.Color,
          }
        ],
        borders : []
      }
    });
       
}
