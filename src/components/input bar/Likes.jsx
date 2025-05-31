import { useContext, useState } from "react";
import { UserQuery } from "../../context/contextVar";

export default function Likes() {
  const { query, setQuery } = useContext(UserQuery);
  const [sliderValue, setSliderValue] = useState(query.likes);
  function handleChange(e) {
    setSliderValue(e.target.value);
    setQuery((prev) => ({ ...prev, likes: e.target.value }));
  }
  return (
    <div>
      <label htmlFor="likes">Likes: </label>
      <input
        type="range"
        name="likes"
        id="likes"
        min={0}
        max={10}
        step={0.1}
        value={sliderValue}
        onChange={handleChange}
      />
      <input
        type="text"
        disabled
        style={{ width: "25px", marginLeft: "5px", textAlign: "center" }}
        value={sliderValue}
      />
    </div>
  );
}
