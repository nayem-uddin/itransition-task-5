import { FabricText, Canvas, Rect, Textbox } from "fabric";
export const coverGen = (title, author, coverColor) => {
  const canvas = new Canvas();
  const canvasHeight = 300;
  const canvasWidth = 300;
  const titleFontSize = 30;
  const authorFontSize = 15;
  const titleLineHeight = 0.9;
  const authorXScaleFactor = 1.5;
  const titleXScaleFactor = 1.2;
  const titleBox = new Textbox(title, {
    fontSize: titleFontSize,
    width: canvasWidth / titleXScaleFactor,
    textAlign: "center",
    lineHeight: titleLineHeight,
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    scaleX: titleXScaleFactor,
  });
  const titleHeight = titleBox.getScaledHeight();
  const authorBox = new Textbox(author, {
    fontSize: authorFontSize,
    width: canvasWidth / authorXScaleFactor,
    textAlign: "center",
    top: titleHeight,
    scaleX: authorXScaleFactor,
  });

  const bg = new Rect({
    height: canvasHeight,
    width: canvasWidth,
    fill: coverColor,
  });
  canvas.add(bg, titleBox, authorBox);
  const src = canvas.toDataURL();
  return src;
};
