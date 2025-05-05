type Props = {
    onStart: () => void;
};

export default function WelcomeScreen({ onStart }: Props) {
    return (
        <div className="fixed inset-0 z-50 bg-animated text-white flex flex-col items-center justify-center animate-fade-in">
            <div className="relative mb-6">
                <h1 className="text-5xl md:text-6xl font-bold text-center glow-text z-10 relative">
                    Welcome to <span className="text-purple-400">Tab Whisperer</span>
                </h1>
                <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-purple-600 animate-pulse-slow z-0" />
            </div>

            <p className="text-lg text-zinc-300 mb-8 max-w-lg text-center">
                Enhance your browsing mindfulness. Log your tab intent and gain XP for staying focused.
            </p>

            <button
                onClick={onStart}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition duration-300 hover:scale-110 glow-button"
            >
                Enter the App 🚀
            </button>
        </div>
    );
}

