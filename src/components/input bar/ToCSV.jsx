import { CSVLink } from "react-csv";

export default function ToCSV({ books }) {
  const headers = [
    { label: "Sl. no.", key: "index" },
    { label: "Title", key: "title" },
    { label: "Author", key: "author" },
    { label: "Publisher", key: "publisher" },
    { label: "ISBN", key: "isbn" },
  ];
  const data = books.map((book, index) => ({ ...book, index: index + 1 }));
  return (
    <div>
      <button className="btn btn-primary">
        <CSVLink
          headers={headers}
          data={data}
          style={{ color: "white", textDecoration: "none" }}
          filename="booklist.csv"
        >
          Export to CSV
        </CSVLink>
      </button>
    </div>
  );
}
