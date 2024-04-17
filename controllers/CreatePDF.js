const PdfLib = require("pdf-lib");
const PDFDocument = PdfLib.PDFDocument;
const StandardFonts = PdfLib.StandardFonts;
const rgb = PdfLib.rgb;
const base64 = require("../utils/base64");
const { writeFileSync, existsSync, mkdirSync } = require("fs");

async function createPDF(data) {
  const base = base64.module;
  const pdfDoc = await PDFDocument.load(base);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const directoryPath = "./PDF";

  const pages = pdfDoc.getPages();
  const page = pages[0];
  const { width, height } = page.getSize();
  const radioPosition = getCoordinates(data.class, height);

  page.drawSquare({
    x: radioPosition.x,
    y: radioPosition.y,
    size: 8,
    color: rgb(0, 0, 0),
  });
  page.drawCircle({
    x: data.gender === "M" ? 544 : 557,
    y: height - 286,
    size: 7,
    borderWidth: 2,
    borderColor: rgb(0, 0, 0),
    opacity: 0,
  });
  page.drawText(data.lastName, {
    x: 178,
    y: height - 289,
    size: 13,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(data.firstName, {
    x: 178,
    y: height - 316,
    size: 13,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(data.address, {
    x: 178,
    y: height - 342,
    size: 13,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(data.postalCode, {
    x: 178,
    y: height - 369,
    size: 13,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(data.city, {
    x: 238,
    y: height - 369,
    size: 13,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(convertDate(data.birthdate), {
    x: 178,
    y: height - 396,
    size: 13,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(data.memberPhone, {
    x: 178,
    y: height - 422,
    size: 13,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  if (data.custodyPhone) {
    page.drawText(data.custodyPhone, {
      x: 288,
      y: height - 422,
      size: 13,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  }
  page.drawText(data.memberEmail, {
    x: 178,
    y: height - 458,
    size: 11,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  if (data.custodyEmail) {
    page.drawText(data.custodyEmail, {
      x: 358,
      y: height - 458,
      size: 11,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  }
  page.drawText(convertDate(new Date()), {
    x: 178,
    y: height - 498,
    size: 13,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  // const pdfUnit8 = await pdfDoc.save();
  // const arr = new Uint8Array(pdfUnit8);
  if (!existsSync(directoryPath)) {
    // If it doesn't exist, create the directory
    mkdirSync(directoryPath);
  }
  writeFileSync(
    `./PDF/${data.firstName}-${data.lastName}.pdf`,
    await pdfDoc.save()
  );
  return "File is created";

  // const blob = new Blob([arr], { type: "application/pdf" });
  // downloadFile(blob, `${data.firstName}-${data.lastName}.pdf`);
}

const convertDate = (date) => {
  const parseDate = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return parseDate.toLocaleDateString("nl-NL", options);
};

const downloadFile = (blob, fileName) => {
  const link = document.createElement("a");
  // create a blobURI pointing to our Blob
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  // some browser needs the anchor to be in the doc
  document.body.append(link);
  link.click();
  link.remove();
  // in case the Blob uses a lot of memory
  setTimeout(() => URL.revokeObjectURL(link.href), 7000);
};

const getCoordinates = (type, height) => {
  let x = 0;
  let y = 0;
  switch (type) {
    case "welpen":
      x = 73;
      y = height - 188;
      break;
    case "pupillen":
      x = 73;
      y = height - 205;
      break;
    case "aspiranten":
      x = 73;
      y = height - 222;
      break;
    case "junioren":
      x = 73;
      y = height - 239;
      break;
    case "senioren":
      x = 302;
      y = height - 192;
      break;
    case "niet-spelend-lid":
      x = 302;
      y = height - 209;
      break;
    case "donateur-korfbalfit":
      x = 302.2;
      y = height - 226;
      break;
    default:
      x = 0;
      y = 0;
  }

  return { x, y };
};

exports.createPDF = createPDF;
