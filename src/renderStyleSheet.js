import sketch, { Text } from "sketch/dom";

export default function(context) {
  let document = sketch.fromNative(context.document);
  const pages = context.document.pages();

  // Remove previous rendered pages (thanks to react-sketchapp)
  for (let index = pages.length - 1; index >= 0; index -= 1) {
    if (pages.length > 1) {
      String(pages[index].name()) === "Rendered Styles" &&
        context.document.documentData().removePageAtIndex(index);
    }
  }

  let RenderPage = context.document.addBlankPage();
  RenderPage.name = "Rendered Styles";

  let previousFrame = null;
  // now make a page

  const stl = document.sharedTextStyles.length;
  for (let property = 0; property < stl; property++) {
    let textLayer = new Text({
      text: document.sharedTextStyles[property].name,
      frame: {
        width:100,
        height: 32,
        x: 0,
        y:
          previousFrame != null
            ? Math.ceil(previousFrame.frame.height + previousFrame.frame.y + 24)
            : 0
      },
      sharedStyleId: document.sharedTextStyles[property].id,
      style: document.sharedTextStyles[property].style,
      parent : RenderPage
    });

    textLayer.name = document.sharedTextStyles[property].name;
    previousFrame = textLayer;
  }
}
