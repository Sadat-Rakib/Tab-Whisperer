import React, { useEffect, useState } from "react";
import IntentModal from "./components/IntentModal";
import HistoryList from "./components/HistoryList";
import CompletionPrompt from "./components/CompletionPrompt";
import StatsDashboard from "./components/StatsDashboard";
import WelcomeScreen from "./components/WelcomeScreen";
import LoadingScreen from "./components/LoadingScreen";
import SmartSuggestions from "./components/SmartSuggestions";
import XPConfetti from "./components/XPConfetti";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import ExportData from "./components/ExportData";

import { Sparkles, Activity, Star, Target } from "lucide-react";

const XP_KEY = "tabXP";
const LOG_KEY = "tabLogs";
const THEME_KEY = "theme";

function addXP(amount: number) {
  const current = parseInt(localStorage.getItem(XP_KEY) || "0");
  localStorage.setItem(XP_KEY, (current + amount).toString());
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [activeLogId, setActiveLogId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem(THEME_KEY) === "dark");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
    setLogs(storedLogs);
    const latest = storedLogs[storedLogs.length - 1];

    if (latest && latest.justOpened) {
      latest.justOpened = false;
      localStorage.setItem(LOG_KEY, JSON.stringify(storedLogs));
      return;
    }

    if (latest && !latest.completed && !latest.promptShown) {
      setActiveLogId(latest.id);
      storedLogs[storedLogs.length - 1].promptShown = true;
      localStorage.setItem(LOG_KEY, JSON.stringify(storedLogs));

      setTimeout(() => {
        setShowPrompt(true);
      }, (latest.estMinutes || 1) * 60 * 1000);
    }
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    const updatedLogs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
    setLogs(updatedLogs);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev ? "dark" : "light";
      localStorage.setItem(THEME_KEY, newTheme);
      return !prev;
    });
  };

  if (loading) return <LoadingScreen />;

  if (showWelcome) {
    return (
      <div className="bg-animated">
        <WelcomeScreen onStart={() => setShowWelcome(false)} />
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-all duration-500 ${isDarkMode
        ? "bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white"
        : "bg-white text-black"
        }`}
    >
      <div className="absolute inset-0 -z-10 bg-dot-pattern animate-pulse-slow"></div>
      <div className="absolute -top-10 left-0 w-full h-full bg-particles opacity-10 pointer-events-none"></div>

      {showConfetti && <XPConfetti />}

      <div className="flex flex-col items-center gap-2 mb-8 animate-fade-in p-6">
        <h1 className="text-4xl font-extrabold glow-text tracking-wide">
          Tab Whisperer
        </h1>
        <p className="text-zinc-400 text-center text-lg animate-fade-in-slow">
          Your Focus, Tracked. Your XP, Earned.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded shadow-md transition duration-300 hover:scale-105 glow-button flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> New Intent
          </button>
          <ExportData />
          <div className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm shadow animate-pulse">
            XP: {localStorage.getItem(XP_KEY) || "0"}
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="bg-gray-800 text-white px-4 py-2 mt-4 rounded"
        >
          Toggle Theme
        </button>
      </div>

      {showModal && <IntentModal onClose={handleModalClose} />}
      {showPrompt && activeLogId && (
        <CompletionPrompt
          logId={activeLogId}
          onClose={() => setShowPrompt(false)}
        />
      )}

      <div className="animate-fade-in space-y-6 px-6">
        {logs.length === 0 ? (
          <div className="text-center text-zinc-400 italic animate-pulse mt-16">
            No sessions yet? Start mastering your browsing flow 💡
          </div>
        ) : (
          <HistoryList />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto mt-10">
          <div className="bg-zinc-800 text-white rounded-lg p-6 shadow-md hover:shadow-xl transition hover:scale-105 glow-card">
            <Activity className="mx-auto mb-2 text-purple-400" />
            <h2 className="font-semibold">Total Sessions</h2>
            <p className="text-2xl mt-1">{logs.length}</p>
          </div>
          <div className="bg-zinc-800 text-white rounded-lg p-6 shadow-md hover:shadow-xl transition hover:scale-105 glow-card">
            <Star className="mx-auto mb-2 text-green-400" />
            <h2 className="font-semibold">Completed</h2>
            <p className="text-2xl mt-1">{logs.filter((l) => l.completed).length}</p>
          </div>
          <div className="bg-zinc-800 text-white rounded-lg p-6 shadow-md hover:shadow-xl transition hover:scale-105 glow-card">
            <Target className="mx-auto mb-2 text-blue-400" />
            <h2 className="font-semibold">Completion Rate</h2>
            <p className="text-2xl mt-1">
              {logs.length === 0
                ? "0%"
                : `${Math.round((logs.filter((l) => l.completed).length / logs.length) * 100)}%`}
            </p>
          </div>
        </div>

        <StatsDashboard />
        <AnalyticsDashboard />
        <SmartSuggestions />
      </div>
    </div>
  );
}

export default App;
