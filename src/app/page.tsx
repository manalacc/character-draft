// The fictional character draft application
// like an NFL draft but for fictional characters (silly side project)
// This is the main page of the application

// TODO list: 
// database to store character entries(?) json file or local storage
// make it fancy with animations
// add more characters
// add a search bar
// add a way to filter characters by category
// add a way to sort characters by popularity or other metrics
// add a way to save drafts
// add a way to share drafts
'use client';

import React, { useState } from "react";
import CardWrapper from "@/components/CardWrapper";
import CategoriesWheel from "@/components/CategoriesWheel";

export default function Home() {
  const [name, setName] = useState("");

  return (
    <div>
      <div>
        <CategoriesWheel />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <CardWrapper />
      </div>
      

      <div className="footer" style={{ fontSize: "10px" }}>not affiliated with any real drafts</div>
    </div>
      
  );
}
