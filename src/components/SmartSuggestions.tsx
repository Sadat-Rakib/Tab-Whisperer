import React, { useEffect, useState } from "react";

const LOG_KEY = "tabLogs";

export default function SmartSuggestions() {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
        const titles = logs.map((log: any) => log.title?.trim()).filter(Boolean);

        const frequency: Record<string, number> = {};
        titles.forEach(title => {
            frequency[title] = (frequency[title] || 0) + 1;
        });

        const sorted = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(entry => entry[0]);

        setSuggestions(sorted);
    }, []);

    if (suggestions.length === 0) return null;

    return (
        <div className="max-w-xl mx-auto bg-zinc-800 p-6 mt-10 rounded-lg shadow-md text-white">
            <h3 className="text-lg font-semibold mb-2 glow-text">Smart Suggestions</h3>
            <p className="text-sm text-zinc-400 mb-4">Based on your most frequent focus sessions:</p>
            <ul className="list-disc list-inside space-y-1">
                {suggestions.map((s, i) => (
                    <li key={i} className="hover:text-purple-400 transition">{s}</li>
                ))}
            </ul>
        </div>
    );
}
