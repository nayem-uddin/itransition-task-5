import { Faker, en } from "@faker-js/faker";
import { bn } from "./bn_custom.js";

// use seed + 1 for Bengali to get ISBNs different from the English books

export default function handleQuery(query, maxNum) {
  const { lang, seed, page } = query;
  if (lang === "bn") {
    const customFaker = new Faker({ locale: [bn] });
    customFaker.seed(Number(seed) + Number(page) + 1);
    return booksGen(customFaker, maxNum, page);
  } else if (lang === "en") {
    const customFaker = new Faker({ locale: [en] });
    customFaker.seed(Number(seed) + Number(page));
    return booksGen(customFaker, maxNum, page);
  }
}

function booksGen(customFaker, maxNum, page) {
  const books = [];
  for (let i = 0; i < maxNum + page; i++) {
    const title = customFaker.book.title();
    const author = customFaker.book.author();
    const textColor = customFaker.color.rgb();
    const coverColor = customFaker.color.rgb();
    const imgLink = imgLinkgen(title, author, textColor, coverColor);
    const book = {
      title: title,
      author: author,
      cover: imgLink,
      publisher: customFaker.book.publisher(),
      isbn: customFaker.commerce.isbn(),
    };
    books.push(book);
  }
  return books;
}

function imgLinkgen(title, author, textColor, coverColor) {
  const width = 200;
  const height = 300;
  const maxCharsPerLine = 18;
  const titleFontSize = 16;
  const authorFontSize = 12;
  const titleLines = [];
  for (let i = 0; i < title.length; i += maxCharsPerLine) {
    titleLines.push(title.slice(i, i + maxCharsPerLine));
  }
  const titleTspans = titleLines
    .map((line, i) => {
      const dy = i === 0 ? 0 : "1.2em";
      return `<tspan x="50%" dy="${dy}">${line}</tspan>`;
    })
    .join("");
  const authorTspan = `<tspan x="50%" dy="1.6em" font-size="${authorFontSize}">${author}</tspan>`;
  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${coverColor}"/>
    <text x="50%" y="40%" text-anchor="middle" font-size="${titleFontSize}" fill="${textColor}" font-family="Arial, sans-serif">
      ${titleTspans}
      ${authorTspan}
    </text>
  </svg>`;
  const imgLink = `data:image/svg+xml;base64,${btoa(svg)}`;
  return imgLink;
}
