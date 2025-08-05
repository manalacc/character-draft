import React, { useState, useEffect, useRef } from "react";

const LOCAL_STORAGE_KEY = "fictional-character-draft-categories";

const CategoriesWheel: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [selected, setSelected] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) setText(stored);
        }
    }, []);

    useEffect(() => {
        if (mounted && typeof window !== "undefined") {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, text);
        }
    }, [text, mounted]);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        const handleWheel = (e: WheelEvent) => {
            // Only apply if textarea is scrollable
            if (el.scrollHeight > el.clientHeight) {
                e.preventDefault();
                el.scrollTop += e.deltaY * 0.25;
            }
        };
        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, []);

    const categories = text
        .split('\n')
        .map(c => c.trim())
        .filter(c => c.length > 0);

    const handleRandomPick = () => {
        if (categories.length > 0) {
            const idx = Math.floor(Math.random() * categories.length);
            setSelected(categories[idx]);
        }
    };

    if (!mounted) return null;

    return (
        <div className="card" style={{ maxWidth: 400, margin: "32px auto" }}>
            <h2 style={{ textAlign: "center", color: "#176638ff", marginBottom: 16 }}>Categories Wheel</h2>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleRandomPick();
                }}
                style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}
            >
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="input"
                    rows={Math.max(5, categories.length)}
                    style={{ resize: "vertical", minHeight: 120, fontFamily: "inherit" }}
                    placeholder="Enter categories, one per line"
                />
                <button
                    type="submit"
                    className="button-random"
                    style={{ width: "100%" }}
                    disabled={categories.length === 0}
                >
                    Pick Random Category
                </button>
            </form>
            {selected && (
                <div style={{
                    marginTop: 8,
                    padding: "10px 0",
                    background: "#eaf6ff",
                    borderRadius: 8,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#0074D9",
                    fontSize: "1.1rem"
                }}>
                    Selected Category: {selected}
                </div>
            )}
        </div>
    );
};

export default CategoriesWheel;