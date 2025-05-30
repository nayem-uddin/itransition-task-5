import { useContext, useEffect, useState } from "react";
import { Shuffle } from "react-bootstrap-icons";
import { seedGen } from "../../randomizer/seedGenerator";
import { UserQuery } from "../../context/contextVar";

export default function Seed() {
  const [seed, setSeed] = useState(0);
  const { setQuery } = useContext(UserQuery);
  useEffect(() => {
    setQuery((prev) => ({ ...prev, seed }));
  }, [seed, setQuery]);
  function handleChange(e) {
    setSeed(e.target.value);
  }
  function handleClick() {
    const randomSeed = seedGen();
    setSeed(randomSeed);
  }
  return (
    <div>
      <label htmlFor="seed">Seed:</label>
      <input
        type="number"
        name="seed"
        id="seed"
        value={seed}
        onChange={handleChange}
      />
      <button type="button" className="btn btn-light" onClick={handleClick}>
        <Shuffle />
      </button>
    </div>
  );
}
