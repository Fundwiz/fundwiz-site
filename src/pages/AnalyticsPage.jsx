// src/pages/AnalyticsPage.jsx
import React, { useEffect, useState } from "react";
import niftyData from "../assets/data/nifty_mock_data.json";
import { generateCandlesFromTicks } from "../utils/processCandles";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Line,
} from "recharts";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function AnalyticsPage() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(niftyData[0]);
  const [tickBuffer, setTickBuffer] = useState([niftyData[0]]);
  const [candles, setCandles] = useState([]);

  // 🟢 Toggle states
  const [playbackEnabled, setPlaybackEnabled] = useState(false); // controls mock tick stream
  const [saveEnabled, setSaveEnabled] = useState(false);         // controls writes to Firestore

  // 📥 Live listener — existing candles in Firestore
  useEffect(() => {
    const candlesRef = collection(db, "candles");
    const q = query(candlesRef, orderBy("time"));
    const unsub = onSnapshot(q, (snap) => {
      const live = snap.docs.map((d) => d.data());
      setCandles(live);
    });
    return () => unsub();
  }, []);

  // 🔄 Mock playback **only when playbackEnabled is true**
  useEffect(() => {
    if (!playbackEnabled) return; // paused

    const interval = setInterval(async () => {
      const nextIdx = (index + 1) % niftyData.length;
      const nextTick = niftyData[nextIdx];
      setTick(nextTick);
      setIndex(nextIdx);

      setTickBuffer((prev) => {
        const updated = [...prev, nextTick];
        const newCandles = generateCandlesFromTicks(updated);
        const lastCandle = newCandles[newCandles.length - 1];

        if (lastCandle) {
          setCandles(newCandles); // update chart locally
          if (saveEnabled) {
            addDoc(collection(db, "candles"), lastCandle).catch((e) => console.error("Firestore write", e));
          }
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [playbackEnabled, saveEnabled, index]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4 text-blue-700 text-center">
        Nifty 50 Tracker — {playbackEnabled ? "LIVE" : "PAUSED"} | Saving {saveEnabled ? "ON" : "OFF"}
      </h2>

      {/* Control buttons */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setPlaybackEnabled(!playbackEnabled)}
          className={`px-4 py-2 rounded text-white transition ${playbackEnabled ? "bg-red-600" : "bg-green-600"}`}
        >
          {playbackEnabled ? "Stop Playback" : "Start Playback"}
        </button>
        <button
          onClick={() => setSaveEnabled(!saveEnabled)}
          disabled={!playbackEnabled}
          className={`px-4 py-2 rounded text-white transition ${saveEnabled ? "bg-red-500" : "bg-indigo-600"} ${!playbackEnabled && "opacity-50 cursor-not-allowed"}`}
        >
          {saveEnabled ? "Stop Saving" : "Start Saving"}
        </button>
      </div>

      {/* Live tick widget */}
      <div className="grid grid-cols-2 gap-4 text-lg mb-6 border p-4 rounded bg-gray-50">
        <div><strong>LTP:</strong> ₹{tick?.LTP}</div>
        <div><strong>Open:</strong> ₹{tick?.Open}</div>
        <div><strong>High:</strong> ₹{tick?.High}</div>
        <div><strong>Low:</strong> ₹{tick?.Low}</div>
        <div><strong>Close:</strong> ₹{tick?.Close}</div>
        <div><strong>Time:</strong> {tick?.Timestamp}</div>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-2">10‑sec Candlestick Chart</h3>
      {candles.length === 0 ? (
        <p className="text-center text-gray-500">Candles will appear when playback is running.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={candles}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
            <Tooltip />
            <Bar dataKey="high" fill="#82ca9d" />
            <Line type="monotone" dataKey="close" stroke="#8884d8" />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
