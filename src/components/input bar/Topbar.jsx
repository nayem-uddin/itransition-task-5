import Likes from "./Likes";
import Review from "./Review";
import Seed from "./Seed";
import SelectLanguage from "./SelectLanguage";
import ToCSV from "./ToCSV";

export default function Topbar({ books }) {
  return (
    <div className="d-flex justify-content-evenly position-fixed container-fluid bg-white p-5 z-3">
      <SelectLanguage />
      <Seed />
      <Likes />
      <Review />
      <ToCSV books={books} />
    </div>
  );
}
