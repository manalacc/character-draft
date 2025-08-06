'use client'
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  options: string[];
  onSelect?: (option: string) => void;
  selectedValue?: string | null;
  placeholder?: string;
  width?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  options, 
  onSelect,
  selectedValue,
  placeholder = "nothing",
  width = "150px"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const displayText = selectedValue || placeholder;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        setIsOpen(false);
        onSelect?.(option);
    };

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                type="button"
                onClick={toggleDropdown}
                style={{
                    backgroundColor: "#383838",
                    color: "#ffffff",
                    padding: "5px 7.5px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    width: width,
                    justifyContent: "space-between"
                }}
            >
                {displayText}
                <ChevronDown className="ml-2" />
            </button>

            {isOpen && (
                <div className="origin-top-right absolute
                                right-0 mt-2 w-56 rounded-md
                                shadow-lg bg-white ring-1 ring-black
                                ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                className="block w-full text-left px-4 py-2
                                           text-sm text-black
                                           hover:bg-gray-100"
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dropdown;