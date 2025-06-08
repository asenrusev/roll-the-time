"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const Wheel = dynamic(
  () => import("react-custom-roulette-r19").then((mod) => mod.Wheel),
  { ssr: false }
);

export default function EditList() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const winnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectionList");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const addItem = () => {
    if (!input.trim()) return;
    setItems((prev) => [...prev, input.trim()]);
    setInput("");
  };

  const removeItem = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRollIt = () => {
    localStorage.setItem("selectionList", JSON.stringify(items));
    if (items.length === 0) return;
    const newPrizeNumber = Math.floor(Math.random() * items.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setWinner(null);
    document.getElementById("roll-div")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStopSpinning = () => {
    setWinner(items[prizeNumber]);
    setTimeout(() => {
      winnerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-200 drop-shadow">
        Edit Your List
      </h1>
      <div className="w-full max-w-xs flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border border-blue-900 rounded text-base bg-gray-800 text-blue-100 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add item"
          onKeyDown={(e) => {
            if (e.key === "Enter") addItem();
          }}
        />
        <button
          className="p-2 bg-blue-700 text-white rounded shadow hover:bg-blue-500 transition"
          onClick={addItem}
        >
          Add
        </button>
      </div>
      <ul className="w-full max-w-xs mb-4 divide-y divide-blue-900 bg-gray-800 rounded shadow">
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center p-2">
            <span className="truncate text-blue-200">{item}</span>
            <button
              className="text-red-400 hover:underline"
              onClick={() => removeItem(idx)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        className="w-full max-w-xs p-3 bg-green-700 text-white text-center rounded shadow mt-auto text-lg font-semibold hover:bg-green-600 transition"
        onClick={handleRollIt}
      >
        Roll It
      </button>
      <div
        id="roll-div"
        className="w-full max-w-xs mt-8 p-4 bg-gray-700 rounded shadow flex flex-col items-center"
      >
        <h2 className="text-lg font-semibold mb-2 text-blue-300">
          Magic Section
        </h2>
        {items.length > 0 ? (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={items.map((item) => ({ option: item }))}
            onStopSpinning={handleStopSpinning}
            backgroundColors={[
              "#a5b4fc",
              "#fbcfe8",
              "#bbf7d0",
              "#fef9c3",
              "#fca5a5",
              "#fcd34d",
            ]}
            textColors={["#222"]}
            spinDuration={1}
          />
        ) : (
          <p className="text-gray-400">Add items to roll.</p>
        )}
        {winner && (
          <div ref={winnerRef} className="mt-6 text-center animate-bounce">
            <span className="block text-base font-bold text-green-300">
              Winner:
            </span>
            <span className="block text-2xl font-extrabold text-green-200 drop-shadow">
              {winner}
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
