import { useContext } from "react";
import { UserQuery } from "../../context/contextVar";

export default function SelectLanguage() {
  const { query, setQuery } = useContext(UserQuery);
  function handleChange(event) {
    setQuery({ ...query, lang: event.target.value });
  }
  return (
    <div>
      <label htmlFor="language">Language:</label>
      <select name="language" id="language" onChange={handleChange}>
        <option value="en">English</option>
        <option value="bn">Bengali</option>
        <option value="ru">Russian</option>
      </select>
    </div>
  );
}
