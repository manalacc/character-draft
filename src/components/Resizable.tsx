'use client'

import { GripVertical } from "lucide-react";
import CardWrapper from "@/components/CardWrapper";
import CategoriesWheel from "@/components/CategoriesWheel";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Display from "@/components/Display";
import { useState } from "react";

export default function Resizable() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [userCards, setUserCards] = useState<any[]>([]);
    const [entrySelections, setEntrySelections] = useState<Record<string, string | null>>({});

    // Handle category selection from dropdown
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    // Handle entry selection from dropdown
    const handleEntrySelect = (cardId: string, entry: string) => {
        setEntrySelections(prev => ({
            ...prev,
            [cardId]: entry
        }));
    };

    return (
        <PanelGroup autoSaveId="example" direction="horizontal">
        <Panel defaultSize={75} minSize={20} maxSize={75}>
            <div style={{
                height: "100vh",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "30px",
            }}>
                <CategoriesWheel 
                    onCategorySelect={setSelectedCategory} 
                    onCategoriesChange={setCategories}
                />
                <CardWrapper 
                    onCardsChange={setUserCards}
                    onEntrySelections={setEntrySelections} 
                />
            </div>
        </Panel>
        <PanelResizeHandle 
            hitAreaMargins={15}
            style={{
                width: "12px",
                minWidth: "12px",
                background: "#383838ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10, // Ensure it's above other elements
            }}
        >
            <div className="handle" style={{
                width: "100%",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                borderRadius: 4,
            }}>
                <GripVertical />
            </div>
        </PanelResizeHandle>
        <Panel defaultSize={25} minSize={20} maxSize={75}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}>
                <Display 
                    category={selectedCategory} 
                    categories={categories}
                    userCards={userCards}
                    entrySelections={entrySelections}
                    onCategorySelect={handleCategorySelect} // Pass the handlers
                    onEntrySelect={handleEntrySelect} // Pass the handlers
                />
            </div>
        </Panel>
        </PanelGroup>
    )
}