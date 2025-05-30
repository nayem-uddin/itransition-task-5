import Book from "./Book";

export default function BooksTable({ books }) {
  return (
    <div>
      <table>
        <thead className="z-3">
          <tr>
            {["Sl. no.", "Title", "Author", "Publisher", "ISBN"].map(
              (field) => (
                <th key={field}>{field}</th>
              )
            )}
          </tr>
        </thead>
        <tbody className="accordion" id="accordionFlushExample">
          {books.map((book, index) => (
            <Book book={book} key={index} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
