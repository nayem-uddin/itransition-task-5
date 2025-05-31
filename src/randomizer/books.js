import { Faker, en } from "@faker-js/faker";
import { bn, ru } from "./customBooks.js";
import { review_ru, reviews_bn, reviews_en } from "./reviews.js";

export default function handleQuery(query, maxNum) {
  const { lang, seed, likes, reviews } = query;
  const likesNumerized = Number(likes);
  const reviewsNumerized = Number(reviews);
  if (lang === "bn") {
    const customFaker = new Faker({ locale: [bn] });
    customFaker.seed(Number(seed) + likesNumerized + reviewsNumerized + 1);
    return booksGen(
      customFaker,
      maxNum,
      reviews_bn,
      likesNumerized,
      reviewsNumerized
    );
  } else if (lang === "en") {
    const customFaker = new Faker({ locale: [en] });
    customFaker.seed(Number(seed) + likesNumerized + reviewsNumerized);
    return booksGen(
      customFaker,
      maxNum,
      reviews_en,
      likesNumerized,
      reviewsNumerized
    );
  } else if (lang === "ru") {
    const customFaker = new Faker({ locale: [ru] });
    customFaker.seed(Number(seed) + likesNumerized + reviewsNumerized - 1);
    return booksGen(
      customFaker,
      maxNum,
      review_ru,
      likesNumerized,
      reviewsNumerized
    );
  }
}

function booksGen(customFaker, maxNum, reviewsList, likes, reviews) {
  const books = [];
  const sizePerSegment = 10;
  const iters = maxNum / sizePerSegment;
  for (let i = 0; i < iters; i++) {
    const tenBooks = perTen(customFaker, likes, reviews, reviewsList);
    books.push(...tenBooks);
  }

  return books;
}

function perTen(faker, totalLikes, totalReviews, reviewsList) {
  const arrayOfTen = [];
  const highestReviews = Math.ceil(totalReviews);
  const lowestReviews = Math.floor(totalReviews);
  const highestLikes = Math.ceil(totalLikes);
  const lowestLikes = Math.floor(totalLikes);
  const expectedHighestLikesCount = (totalLikes - lowestLikes) * 10;
  const expectedHighestReviewsCount = (totalReviews - lowestReviews) * 10;
  let highestLikesCount = 0;
  let highestReviewsCount = 0;
  while (arrayOfTen.length < 10) {
    const isExpectedLikesReached =
      highestLikesCount === expectedHighestLikesCount;
    const likes = isExpectedLikesReached ? lowestLikes : highestLikes;
    highestLikesCount += isExpectedLikesReached ? 0 : 1;
    const isExpectedReviewsReached =
      highestReviewsCount === expectedHighestReviewsCount;
    const reviews = isExpectedReviewsReached ? lowestReviews : highestReviews;
    highestReviewsCount += isExpectedReviewsReached ? 0 : 1;
    const book = createBook(faker, reviewsList, likes, reviews);
    arrayOfTen.push(book);
  }
  faker.helpers.shuffle(arrayOfTen, { inplace: true });
  return arrayOfTen;
}

function imgLinkgen(title, author, textColor, coverColor) {
  const width = 200;
  const height = 300;
  const maxCharsPerLine = 18;
  const titleFontSize = 18;
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
  const imgLink = `data:image/svg+xml;base64,${base64EncodeUnicode(svg)}`;
  return imgLink;
}

function reviewsgen(faker, reviewsList, reviews) {
  return faker.helpers.arrayElements(reviewsList, reviews);
}

function createBook(customFaker, reviewsList, likes, noofReviews) {
  const title = customFaker.book.title();
  const author = customFaker.book.author();
  const textColor = customFaker.color.rgb();
  const coverColor = customFaker.color.rgb({ includeAlpha: true });
  const imgLink = imgLinkgen(title, author, textColor, coverColor);
  const reviews = reviewsgen(customFaker, reviewsList, noofReviews);
  return {
    title: title,
    author: author,
    cover: imgLink,
    reviews,
    likes,
    publisher: customFaker.book.publisher(),
    isbn: customFaker.commerce.isbn(),
  };
}

function base64EncodeUnicode(str) {
  const utf8Bytes = new TextEncoder().encode(str);
  const binary = String.fromCharCode(...utf8Bytes);
  return btoa(binary);
}
