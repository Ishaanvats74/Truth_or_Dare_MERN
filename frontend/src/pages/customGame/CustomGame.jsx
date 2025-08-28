import React, { useState } from "react";

const Page = () => {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNames([...names, name]);
    setName("");
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSubmit(e);
    }
  };

  const handleRemove = (item) => {
    const updatedNames = names.filter((n) => n !== item);
    setNames(updatedNames);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="flex flex-col gap-3 mb-6 bg-white/10 p-10 rounded-2xl justify-center items-center w-96">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Enter a name..."
          className="px-4 py-2  rounded-xl border w-full bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-blue-600 text-white w-full rounded-xl shadow hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>

      <div className="w-full max-w-sm space-y-2">
        {names.map((item, index) => (
          <div
            key={index}
            className="bg-white px-4 py-2 rounded-lg shadow border border-gray-200"
          >
            <div>{item}</div>
            <button onClick={() => handleRemove(item)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
