import { Faker, en } from "@faker-js/faker";
import { bn, ru } from "./customBooks.js";
import { review_ru, reviews_bn, reviews_en } from "./reviews.js";

export default function handleQuery(query, maxNum) {
  const { lang, seed, likes, reviews } = query;
  if (lang === "bn") {
    const customFaker = new Faker({ locale: [bn] });
    customFaker.seed(Number(seed) + 1);
    return booksGen(customFaker, maxNum, reviews_bn, likes, reviews);
  } else if (lang === "en") {
    const customFaker = new Faker({ locale: [en] });
    customFaker.seed(Number(seed));
    return booksGen(customFaker, maxNum, reviews_en, likes, reviews);
  } else if (lang === "ru") {
    const customFaker = new Faker({ locale: [ru] });
    customFaker.seed(Number(seed) - 1);
    return booksGen(customFaker, maxNum, review_ru, likes, reviews);
  }
}

function booksGen(customFaker, maxNum, reviewsList, likes, reviews) {
  const books = [];
  const iters = maxNum / 10;
  for (let i = 0; i < iters; i++) {
    const tenBooks = perTen(customFaker, likes, reviews, reviewsList);
    books.push(...tenBooks);
  }
  return books;
}

function perTen(faker, totalLikes, totalReviews, reviewsList) {
  const arrayOfTen = [];
  const numerizedReviews = Number(totalReviews);
  const numerizedLikes = Number(totalLikes);
  const highestReviews = Math.ceil(numerizedReviews);
  const lowestReviews = Math.floor(numerizedReviews);
  const highestLikes = Math.ceil(numerizedLikes);
  const lowestLikes = Math.floor(numerizedLikes);
  const expectedHighestLikesCount = (numerizedLikes - lowestLikes) * 10;
  const expectedHighestReviewsCount = (numerizedReviews - lowestReviews) * 10;
  let highestLikesCount = 0;
  let highestReviewsCount = 0;
  // let attempts = 0;
  // const MAX_ATTEMPTS = 100;
  // const candidates = [];
  while (arrayOfTen.length < 10) {
    const isExpectedLikesReached =
      highestLikesCount === expectedHighestLikesCount;
    const likes = isExpectedLikesReached ? lowestLikes : highestLikes;
    highestLikesCount += Number(!isExpectedLikesReached);
    const isExpectedReviewsReached =
      highestReviewsCount === expectedHighestReviewsCount;
    const reviews = isExpectedReviewsReached ? lowestReviews : highestReviews;
    highestReviewsCount += Number(!isExpectedReviewsReached);
    const book = createBook(faker, reviewsList, likes, reviews);
    arrayOfTen.push(book);
  }

  // while (arrayOfTen.length < 10 && attempts < MAX_ATTEMPTS) {
  //   attempts++;
  //   const book = createBook(faker, reviewsList, totalLikes, totalReviews);
  //   const { likes, reviews } = book;
  //   const NoOfReviews = reviews.length;
  //   const inLikeRange = likes >= lowestLikes && likes <= highestLikes;
  //   const inReviewRange =
  //     NoOfReviews >= lowestReviews && NoOfReviews <= highestReviews;
  //   if (inLikeRange && inReviewRange) {
  //     let added = false;
  //     if (
  //       likes === highestLikes &&
  //       highestLikesCount < expectedHighestLikesCount
  //     ) {
  //       highestLikesCount++;
  //       arrayOfTen.push(book);
  //       added = true;
  //     }
  //     if (
  //       !added &&
  //       NoOfReviews === highestReviews &&
  //       highestReviewsCount < expectedHighestReviewsCount
  //     ) {
  //       highestReviewsCount++;
  //       arrayOfTen.push(book);
  //       added = true;
  //     }
  //     if (!added && arrayOfTen.length < 10) {
  //       arrayOfTen.push(book);
  //     }
  //   } else {
  //     candidates.push(book);
  //   }
  // }
  // while (arrayOfTen.length < 10 && candidates.length > 0) {
  //   arrayOfTen.push(candidates.pop());
  // }

  // if (arrayOfTen.length < 10) {
  //   console.warn(
  //     `Only generated ${arrayOfTen.length} books after ${MAX_ATTEMPTS} attempts.`
  //   );
  // }
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
  const minReviews = Math.floor(reviews);
  const maxReviews = Math.ceil(reviews);
  return faker.helpers.arrayElements(reviewsList, {
    max: maxReviews,
    min: minReviews,
  });
}

function createBook(customFaker, reviewsList, noofLikes, noofReviews) {
  const title = customFaker.book.title();
  const author = customFaker.book.author();
  const textColor = customFaker.color.rgb();
  const coverColor = customFaker.color.rgb({ includeAlpha: true });
  const imgLink = imgLinkgen(title, author, textColor, coverColor);
  const reviews = reviewsgen(customFaker, reviewsList, noofReviews);
  const likes = customFaker.number.int({
    max: Math.ceil(noofLikes),
    min: Math.floor(noofLikes),
  });
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
