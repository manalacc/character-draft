import React, { useState, useEffect, useRef } from 'react';
import { Trash2, X } from 'lucide-react';

interface UserEntry {
  id: string;
  text: string;
}

interface UserCardProps {
  id: string;
  name: string;
  entries: UserEntry[];
  onNameChange: (newName: string) => void;
  onRemove: () => void;
  onBulkEditEntries: (newEntries: string[]) => void;
}

const LOCAL_STORAGE_KEY = "fictional-character-draft-entries";

const UserCard: React.FC<UserCardProps> = ({
  name,
  entries,
  onNameChange,
  onRemove,
  onBulkEditEntries,
}) => {
  const [text, setText] = useState<string>(entries.map(e => e.text).join('\n'));
  const [randomEntry, setRandomEntry] = useState<UserEntry | null>(null);
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    // Only set text from entries on first mount
    setText(entries.map(e => e.text).join('\n'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}-${name}`, text);
    }
  }, [text, mounted, name]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (el.scrollHeight > el.clientHeight) {
        e.preventDefault();
        el.scrollTop += e.deltaY * 0.25;
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const handleBulkEdit = (value: string) => {
    setText(value);
    const newEntries = value
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    onBulkEditEntries(newEntries);
  };

  const handleRandomPick = () => {
    const entryList = text
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    if (entryList.length > 0) {
      const idx = Math.floor(Math.random() * entryList.length);
      setRandomEntry({ id: String(idx), text: entryList[idx] });
    }
  };

  const handleRemoveRandomEntry = () => {
    if (!randomEntry) return;
    const entryList = text
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    const updatedEntries = entryList.filter(t => t !== randomEntry.text);
    const updatedText = updatedEntries.join('\n');
    setText(updatedText);
    onBulkEditEntries(updatedEntries);
    setRandomEntry(null);
  };

  if (!mounted) return null;

  return (
    <div className="card">
      <div style={{ display: "flex", marginBottom: 8, fontSize: '1.2rem', fontWeight: 'bold', alignItems: 'center',  }}>
        <input
          type="text"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          placeholder="User Name"
          className="input"
          style={{ border: "none" }}
        />
        <button
          onClick={onRemove}
          style={{ marginBottom: 8, background: "none", cursor: "pointer" }}
          title="Remove card"
          className="button-remove"
        >
          <X color="white" size={16} />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={e => handleBulkEdit(e.target.value)}
        className="input"
        rows={Math.max(5, entries.length)}
        style={{ resize: "vertical", minHeight: 120, fontFamily: "inherit", marginBottom: 12, border: "None" }}
        placeholder="Enter entries, one per line"
      />
      <button
        onClick={handleRandomPick}
        className="button-random"
        style={{ width: "100%" }}
        disabled={text.trim().length === 0}
      >
        Pick Randomly
      </button>
      {randomEntry && (
        <div style={{
          marginTop: 8,
          padding: "10px 12px",
          background: "#eaf6ff",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "bold",
          color: "#0074D9",
          fontSize: "1.1rem"
        }}>
          <span>{randomEntry.text}</span>
          <button
            onClick={handleRemoveRandomEntry}
            className="button-remove"
            title="Delete this entry"
            style={{ marginLeft: 12, border: "none", background: "none", cursor: "pointer", color: "#ff0000" }}
          >
            <Trash2 size={15} />
          </button>
        </div>     
      )}
    </div>
  );
};

export default UserCard;