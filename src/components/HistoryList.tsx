export default function HistoryList() {
    const logs = JSON.parse(localStorage.getItem("tabLogs") || "[]").reverse();

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">History</h2>
            {logs.length === 0 ? (
                <p className="text-gray-400">No tab sessions logged yet.</p>
            ) : (
                <ul className="space-y-4">
                    {logs.map((log: any) => (
                        <li
                            key={log.id}
                            className="bg-zinc-800 p-4 rounded-lg shadow flex justify-between items-center"
                        >
                            <div>
                                <div className="text-sm text-zinc-400">{new Date(log.timestamp).toLocaleString()}</div>
                                <div className="font-semibold">{log.description}</div>
                                <div className="text-sm text-zinc-300">{log.url}</div>
                            </div>
                            <div>
                                {log.completed ? (
                                    <span className="text-green-400 font-bold">✔ Done</span>
                                ) : (
                                    <span className="text-red-400 font-bold">✘ Skipped</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
