import ReviewsDisplay from "./ReviewsDisplay";

export default function Book({ book, index }) {
  const { title, author, publisher, isbn, cover, likes, reviews } = book;
  return (
    <>
      <tr className="accordion-item">
        <button
          className="accordion-button collapsed z-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${index}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${index}`}
        >
          {[index, title, author, publisher, isbn].map((value) => (
            <td key={value}>{value}</td>
          ))}
        </button>
        <div
          id={`flush-collapse${index}`}
          className="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body d-flex">
            <img src={cover} alt={title} width="200px" height="300px" />
            <aside className="mt-2 ms-4">
              <header>
                <p className="h4">{title}</p>
                <p className="h6">{author}</p>
              </header>
              <main className="mt-3">
                <p>
                  {" "}
                  <b>Publisher: </b>
                  {publisher}
                </p>
                <p>
                  <b>ISBN:</b> {isbn}
                </p>
                <p>
                  <b>Likes:</b> {likes}
                </p>
                <p>
                  <b>Reviews:</b>
                  <p className="mt-4">
                    {reviews.length == 0 && <p>No reviews yet</p>}
                    {reviews.length > 0 && (
                      <ul>
                        {reviews.map((review) => (
                          <ReviewsDisplay reviewObject={review} />
                        ))}
                      </ul>
                    )}
                  </p>
                </p>
              </main>
            </aside>
          </div>
        </div>
      </tr>
    </>
  );
}
