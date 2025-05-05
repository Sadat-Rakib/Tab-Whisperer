import React from "react";

const LOG_KEY = "tabLogs";

export default function ExportData() {
    const handleExport = (format: "json" | "csv" | "xml") => {
        const logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
        let data: string;
        let type: string;
        let extension: string;

        if (format === "json") {
            data = JSON.stringify(logs, null, 2);
            type = "application/json";
            extension = "json";
        } else if (format === "csv") {
            const keys = Object.keys(logs[0] || {});
            const rows = logs.map((log: any) => keys.map(k => `"${log[k] || ""}"`).join(","));
            data = `${keys.join(",")}\n${rows.join("\n")}`;
            type = "text/csv";
            extension = "csv";
        } else {
            data = `<logs>\n${logs.map(log =>
                `<log>\n${Object.entries(log).map(([k, v]) => `  <${k}>${v}</${k}>`).join("\n")}\n</log>`).join("\n")
                }\n</logs>`;
            type = "application/xml";
            extension = "xml";
        }

        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tab-logs.${extension}`;
        a.click();
    };

    return (
        <div className="flex gap-2">
            {["json", "csv", "xml"].map(format => (
                <button
                    key={format}
                    onClick={() => handleExport(format as "json" | "csv" | "xml")}
                    className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded shadow-sm text-sm"
                >
                    Export {format.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
