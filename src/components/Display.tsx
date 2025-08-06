'use client'
import Dropdown from "./Dropdown";

interface DisplayProps {
    category: string | null;
    categories?: string[];
    userCards?: Array<{id: string; name: string; entries: Array<{id: string; text: string}>}>;
    entrySelections?: Record<string, string | null>;
    onCategorySelect?: (category: string) => void; // Add this
    onEntrySelect?: (cardId: string, entry: string) => void; // Add this
}

const Display: React.FC<DisplayProps> = ({
    category,
    categories = [],
    userCards = [],
    entrySelections = {},
    onCategorySelect, // Add this
    onEntrySelect // Add this
}) => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
      padding: "20px",
      gap: "12px"
    }}>
    
    <Dropdown 
        options={categories}
        selectedValue={category}
        onSelect={onCategorySelect} // Use the callback instead of console.log
        placeholder="nothing"
    />

    {userCards.map(card => (
      <div key={card.id} style={{
        width: "50%",
        
      }}>
        <Dropdown 
          options={card.entries.map(entry => entry.text)}
          selectedValue={entrySelections[card.id] || null} 
          onSelect={(entry) => onEntrySelect?.(card.id, entry)} // Use the callback
          placeholder={`${card.name}`}
          width="200px"
        />
      </div>
    ))}

    </div>
  );
}

export default Display;