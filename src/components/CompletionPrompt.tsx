type Props = {
    logId: number;
    onClose: () => void;
};

export default function CompletionPrompt({ logId, onClose }: Props) {
    const handleResponse = (completed: boolean) => {
        const logs = JSON.parse(localStorage.getItem("tabLogs") || "[]");

        const index = logs.findIndex((log: any) => log.id === logId);
        if (index !== -1) {
            logs[index].completed = completed;
            localStorage.setItem("tabLogs", JSON.stringify(logs));

            if (completed) {
                const XP_KEY = "tabXP";
                const currentXP = parseInt(localStorage.getItem(XP_KEY) || "0");
                localStorage.setItem(XP_KEY, (currentXP + 10).toString());
            }
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white text-black p-6 rounded-lg w-80 shadow-xl space-y-4">
                <h3 className="text-lg font-semibold">Did you complete your task?</h3>
                <div className="flex gap-4 justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleResponse(false)}
                    >
                        No
                    </button>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => handleResponse(true)}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}
