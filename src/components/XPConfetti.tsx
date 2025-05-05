import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function XPConfetti() {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        const myConfetti = confetti.create(ref.current, { resize: true });
        myConfetti({
            particleCount: 100,
            spread: 160,
            origin: { y: 0.6 },
            colors: ["#facc15", "#a855f7", "#34d399"],
        });
        setTimeout(() => ref.current?.remove(), 1500);
    }, []);

    return (
        <canvas
            ref={ref}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        />
    );
}
