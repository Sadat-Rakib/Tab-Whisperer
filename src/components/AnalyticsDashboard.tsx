import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LOG_KEY = "tabLogs";

export default function AnalyticsDashboard() {
    const [weeklyData, setWeeklyData] = useState<number[]>([]);

    useEffect(() => {
        const logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
        const data = Array(7).fill(0); // Sun to Sat
        const today = new Date();

        logs.forEach((log: any) => {
            const date = new Date(log.createdAt);
            const dayDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
            if (dayDiff >= 0 && dayDiff < 7) {
                const dayIndex = (today.getDay() - dayDiff + 7) % 7; // map to Sun-Sat (0-6)
                data[dayIndex]++;
            }
        });

        setWeeklyData(data);
    }, []);

    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const chartData = {
        labels,
        datasets: [
            {
                label: "Focus Sessions",
                data: weeklyData,
                backgroundColor: weeklyData.map((count) =>
                    count > 0 ? "#8b5cf6" : "#3f3f46"
                ),
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#d4d4d8",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#d4d4d8",
                },
                grid: {
                    color: "#27272a",
                },
            },
            y: {
                ticks: {
                    color: "#d4d4d8",
                },
                grid: {
                    color: "#27272a",
                },
            },
        },
    };

    return (
        <div className="mt-12 p-6 rounded-xl bg-zinc-900 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 glow-text">📊 Weekly Activity</h2>
            <div className="bg-zinc-800 p-4 rounded-lg shadow-inner">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}
