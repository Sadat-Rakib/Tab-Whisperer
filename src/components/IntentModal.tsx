import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const LOG_KEY = "tabLogs";

type Props = {
    onClose: () => void;
};

export default function IntentModal({ onClose }: Props) {
    const [tabName, setTabName] = useState("");
    const [reason, setReason] = useState("");
    const [minutes, setMinutes] = useState(5);

    const handleStart = () => {
        if (!tabName) return;

        const newLog = {
            id: uuidv4(),
            tabName,
            reason,
            estMinutes: minutes,
            createdAt: new Date().toISOString(),
            completed: false,
            justOpened: true,
        };

        const logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
        logs.push(newLog);
        localStorage.setItem(LOG_KEY, JSON.stringify(logs));

        window.open("https://" + tabName, "_blank"); // Optional: Open the tab directly
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold">New Intent</h2>

                {/* Tab Name Input */}
                <div>
                    <label className="block text-sm mb-1 font-semibold">
                        Which tab do you want to open?
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none"
                        placeholder="e.g. youtube.com or twitter.com"
                        value={tabName}
                        onChange={(e) => setTabName(e.target.value)}
                    />
                </div>

                {/* Reason Input */}
                <div>
                    <label className="block text-sm mb-1 font-semibold">
                        Why are you opening it?
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none"
                        placeholder="e.g. taking a break, searching for notes"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>

                {/* Time Input */}
                <div>
                    <label className="block text-sm mb-1 font-semibold">
                        Estimated Minutes:
                    </label>
                    <input
                        type="number"
                        min={1}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                        value={minutes}
                        onChange={(e) => setMinutes(Number(e.target.value))}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        className="bg-zinc-600 hover:bg-zinc-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white font-semibold"
                        onClick={handleStart}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
}
