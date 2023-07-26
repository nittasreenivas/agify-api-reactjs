import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [names, setNames] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const getName = async () => {
      const response = await fetch(`https://api.agify.io/?name=${name}`);
      const data = await response.json();
      setNames(data);
      setName("");
    };

    getName();
  };

  return (
    <>
      <section>
        <h1>
          Predict the Age of a name using the{" "}
          <a href="https://agify.io">Agify API</a>
        </h1>

        <form onSubmit={handleSubmit}>
          <article>
            <label htmlFor="name">Search for a name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Search for a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </article>
          <button onClick={handleSubmit} type="submit">
            Search
          </button>
        </form>

        {names ? (
          <div>
            <ul>
              <li>You searched for {names.name}</li>
              <li>They are likely {names.age} years old</li>
              <li>
                The name {names.name} has been searched for{" "}
                {names.count.toLocaleString()} times
              </li>
            </ul>
          </div>
        ) : (
          <label htmlFor="name">Search for a name</label>
        )}
      </section>
    </>
  );
}