import { useContext, useState } from "react";
import { UserQuery } from "../../context/contextVar";

export default function Review() {
  const { query, setQuery } = useContext(UserQuery);
  const [value, setValue] = useState(query.reviews);
  function handleChange(e) {
    const userInput = e.target.value;
    setValue(userInput);
    setQuery((prev) => ({ ...prev, reviews: userInput }));
  }
  return (
    <div>
      <label htmlFor="review">Review: </label>
      <input
        type="number"
        name="review"
        id="review"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
