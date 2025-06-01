import { useContext, useEffect, useState } from "react";
import Topbar from "../input bar/Topbar";
import BooksTable from "./BooksTable";
import { UserQuery } from "../../context/contextVar";
import handleQuery from "../../randomizer/books";

export default function UserInterface() {
  const { query } = useContext(UserQuery);
  const [bookList, setBookList] = useState([]);
  const [pageno, setPage] = useState(0);
  function handleScroll() {
    setPage(
      (prev) =>
        prev + Math.floor((scrollY + innerHeight) / document.body.offsetHeight)
    );
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function updateBooks() {
      const newBooks = handleQuery(query, pageno * 10 + 20);
      setBookList(newBooks);
    }
    updateBooks();
  }, [pageno, query]);

  return (
    <div>
      <Topbar books={bookList} />
      <div>
        <BooksTable books={bookList} />
      </div>
    </div>
  );
}
