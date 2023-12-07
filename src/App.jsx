import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [characterAllow, setCharacterAllow] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";

    if (numberAllow) {
      str += "0123456789";
    }

    if (characterAllow) {
      str += "!@#$%^&*_+={}[]~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllow, characterAllow, setPassword]);

  const copyPasswordClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, characterAllow, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto shadow-lg my-8 bg-gray-700 p-6 rounded-lg text-white">
        <h1 className="text-3xl font-bold text-center mb-4">Password Generator</h1>
        <div className="flex flex-col md:flex-row md:items-center shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="w-full md:w-2/3 outline-none py-2 px-3 bg-gray-800 text-gray-300 mb-2 md:mb-0"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordClipboard}
            className="bg-blue-700 text-white px-3 py-2 ml-0 md:ml-2 rounded-md"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col md:flex-row text-sm gap-x-2">
          <div className="flex items-center gap-x-1 mb-2 md:mb-0">
            <label className="mr-2">Length:</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <span>{length}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              id="numberInput"
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="ml-1">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllow}
              id="characterInput"
              onChange={() => {
                setCharacterAllow((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="ml-1">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
