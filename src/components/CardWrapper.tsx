import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator for unique IDs
import UserCard from './UserCard'; // Import the UserCard component
import { Plus } from 'lucide-react'; // Import Plus icon for UI

const LOCAL_STORAGE_KEY = 'fictional-character-draft-cards'; // Define the localStorage key for saving cards

// Define the shape of a card, which includes a name and a list of entries
type CardData = { id: string; name: string; entries: { id: string; text: string }[] };

const CardWrapper: React.FC = () => {
  // State to hold all cards; initially empty array
  const [cards, setCards] = useState<CardData[]>([]);

  // Load cards from localStorage when the component mounts
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY); // Get stored cards from localStorage
    if (stored) {
      // If there is stored data, parse it and ensure each card has an entries array
      const loaded = JSON.parse(stored).map((card: any) => ({
        ...card,
        entries: Array.isArray(card.entries) ? card.entries : [] // Defensive: ensure entries is always an array
      }));
      setCards(loaded); // Set the loaded cards to state
    } else {
      // If no stored data, initialize with a single default card
      setCards([{ id: uuidv4(), name: 'User 1', entries: [] }]);
    }
  }, []); // Run only once on mount

  // Save cards to localStorage whenever the cards state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards)); // Serialize and save cards array
  }, [cards]); // Run whenever cards changes

  // Add a new card to the cards array
  const addCard = () => {
    setCards([
      ...cards, // Keep existing cards
      { id: uuidv4(), name: `User ${cards.length + 1}`, entries: [] } // Add new card with unique ID and empty entries
    ]);
  };

  // Remove a card by its ID
  const removeCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id)); // Filter out the card with the matching ID
  };

  // Change the name of a card by its ID
  const handleNameChange = (id: string, newName: string) => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, name: newName } : card // Update name if ID matches, otherwise keep card unchanged
    ));
  };

  // Bulk edit: replaces all entries for a card
  const handleBulkEditEntries = (cardId: string, newEntries: string[]) => {
    setCards(cards.map(card =>
      card.id === cardId
        ? {
            ...card,
            entries: newEntries.map(text => ({
              id: uuidv4(),
              text
            }))
          }
        : card
    ));
  };

  // Render the UI
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px" }}>
      {/* Button to add a new card */}
      <button
        onClick={addCard}
        style={{
          border: "solid",
          marginBottom: 16,
          borderRadius: 35,
          backgroundColor: "#018613ff",
          borderColor: "#018613ff",
          padding: 4,
          cursor: 'pointer',
        }}
      >
        <Plus /> {/* Plus icon for visual indication */}
      </button>
      {/* Container for all user cards */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        {cards.map(card => (
          <UserCard
            key={card.id}          // Unique key for React rendering
            id={card.id}           // Card ID
            name={card.name}       // Card name
            entries={card.entries} // Card entries
            onNameChange={newName => handleNameChange(card.id, newName)} // Handler for name change
            onRemove={() => removeCard(card.id)} // Handler for removing card
            onBulkEditEntries={newEntries => handleBulkEditEntries(card.id, newEntries)} // Handler for bulk editing entries
            // onAddEntry={() => {}}
            // onRemoveEntry={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default CardWrapper; // Export