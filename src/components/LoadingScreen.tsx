import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-900 via-black to-indigo-900 bg-particles">
            <Loader2 className="h-10 w-10 animate-spin text-purple-400 mb-4" />
            <h2 className="text-2xl font-bold glow-text text-center">Initializing Tab Whisperer...</h2>
            <p className="text-sm text-zinc-300 mt-2 text-center animate-pulse">
                Loading your focused universe 🌌
            </p>
        </div>
    );
}
