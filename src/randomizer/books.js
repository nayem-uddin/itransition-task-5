import { Faker, en } from "@faker-js/faker";
import { bn, ru } from "./customBooks.js";
import { review_ru, reviews_bn, reviews_en } from "./reviews.js";
import { coverGen } from "./coverGen.js";

export default function handleQuery(query, maxNum) {
  const { lang, seed, likes, reviews } = query;
  const twist = 1;
  if (lang === "bn") {
    const customFaker = new Faker({ locale: [bn] });
    customFaker.seed(Number(seed) + likes + reviews + twist);
    return booksGen(customFaker, maxNum, reviews_bn, likes, reviews);
  } else if (lang === "en") {
    const customFaker = new Faker({ locale: [en] });
    customFaker.seed(Number(seed) + likes + reviews);
    return booksGen(customFaker, maxNum, reviews_en, likes, reviews);
  } else if (lang === "ru") {
    const customFaker = new Faker({ locale: [ru] });
    customFaker.seed(Number(seed) + likes + reviews - twist);
    return booksGen(customFaker, maxNum, review_ru, likes, reviews);
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
  const completeArrayLength = 10;
  const expectedHighestLikesCount = Math.round(
    (totalLikes - lowestLikes) * completeArrayLength
  );
  const expectedHighestReviewsCount = Math.round(
    (totalReviews - lowestReviews) * completeArrayLength
  );
  let highestLikesCount = 0;
  let highestReviewsCount = 0;
  while (arrayOfTen.length < completeArrayLength) {
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

function reviewsgen(faker, reviewsList, reviews) {
  return faker.helpers.arrayElements(reviewsList, reviews);
}

function createBook(customFaker, reviewsList, likes, noofReviews) {
  const title = customFaker.book.title();
  const author = customFaker.book.author();
  const coverColor = customFaker.color.rgb({ includeAlpha: true });
  const imgLink = coverGen(title, author, coverColor);
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
