import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isAlphaNumeric, setIsAlphaNumeric] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [password, setPassword] = useState("");

  const pswdGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isAlphaNumeric) str += "01234567890";
    if (isSymbol) str += "!@#$%^&*()/-+*~{}[]";

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length, isAlphaNumeric, isSymbol, setPassword]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(1, 3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    pswdGenerator();
  }, [length, isAlphaNumeric, isSymbol, pswdGenerator]);

  return (
    <div className="text-slate-200 w-full text-center h-screen bg-gray-900  ">
      <div className="">
        <div className="py-10">
          <h1 className="text-4xl ">Password Generator </h1>
        </div>
        <div className="max-w-md mx-auto py-4 rounded-lg px-2 my-8 text-orange-500 bg-gray-800">
          <div className="">
            <input
              className="outline-none bg-gray-900 rounded-md text-xl font-semibold mx-4 w-10/12 px-4 py-2"
              type="text"
              readOnly="true"
              value={password}
              ref={passwordRef}
              placeholder="password"
            />
            <button onClick={copyPasswordToClipboard} className="bg">
              Copy
            </button>
          </div>
          <div className="flex text-sm ">
            <div className="flex mx-2  py-4 items-center gap-x-1">
              <label className="text-lg" htmlFor="range">
                Length: {length}
              </label>
              <input
                type="range"
                name=""
                id=""
                min={6}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
            </div>
            <div className="flex mx-1  py-4 items-center gap-x-1">
              <label className="text-lg" htmlFor="range">
                Numbers
              </label>
              <input
                defaultChecked={isAlphaNumeric}
                onChange={() => {
                  setIsAlphaNumeric((prev) => {
                    return !prev;
                  });
                }}
                type="checkbox"
                name=""
                id=""
              />
            </div>
            <div className="flex  mx-1  py-4 items-center gap-x-1">
              <label className="text-lg" htmlFor="range">
                Symbols
              </label>
              <input
                defaultChecked={isSymbol}
                onChange={() => {
                  setIsSymbol((prev) => {
                    return !prev;
                  });
                }}
                type="checkbox"
                name=""
                id=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
