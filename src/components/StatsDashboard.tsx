export default function StatsDashboard() {
    const logs = JSON.parse(localStorage.getItem("tabLogs") || "[]");

    const totalSessions = logs.length;
    const completedSessions = logs.filter((log: any) => log.completed).length;
    const failedSessions = totalSessions - completedSessions;

    const completionRate = totalSessions
        ? Math.round((completedSessions / totalSessions) * 100)
        : 0;

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">📊 Your Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-zinc-800 p-4 rounded shadow">
                    <div className="text-lg font-semibold">Total Sessions</div>
                    <div className="text-2xl mt-2">{totalSessions}</div>
                </div>
                <div className="bg-zinc-800 p-4 rounded shadow">
                    <div className="text-lg font-semibold">Completed</div>
                    <div className="text-2xl mt-2 text-green-400">{completedSessions}</div>
                </div>
                <div className="bg-zinc-800 p-4 rounded shadow">
                    <div className="text-lg font-semibold">Completion Rate</div>
                    <div className="text-2xl mt-2">{completionRate}%</div>
                </div>
            </div>
        </div>
    );
}
