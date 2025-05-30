export default function Book({ book, index }) {
  const { title, author, publisher, isbn, cover } = book;
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
            <img src={cover} alt={title} />
            <aside className="mt-2 ms-4">
              <header>
                <p className="h4">{title}</p>
                <p className="h6">{author}</p>
              </header>
              <main className="mt-3">
                <p>Publisher: {publisher}</p>
                <p>ISBN: {isbn}</p>
              </main>
            </aside>
          </div>
        </div>
      </tr>
    </>
  );
}
