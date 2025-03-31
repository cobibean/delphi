"use client";

import React from "react";
import { useToast, standalone } from "../Toast/useToast";

// Test component that creates different types of toasts
export default function TestToast() {
  const { toast } = useToast();

  // Function to test different toast types
  const testToasts = () => {
    toast.success("Success Toast", "This is a success message");
    
    // Add error toast after 1 second
    setTimeout(() => {
      toast.error("Error Toast", "This is an error message");
    }, 1000);
    
    // Add info toast after 2 seconds  
    setTimeout(() => {
      toast.info("Info Toast", "This is an info message");
    }, 2000);
    
    // Add warning toast after 3 seconds
    setTimeout(() => {
      toast.warning("Warning Toast", "This is a warning message");
    }, 3000);
    
    // Test standalone toast after 4 seconds
    setTimeout(() => {
      standalone.success("Standalone Toast", "This is a standalone success message");
    }, 4000);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Toast Test Component</h2>
      <button
        onClick={testToasts}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test All Toasts
      </button>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={() => toast.success("Success", "Operation completed successfully")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Success Toast
        </button>
        <button
          onClick={() => toast.error("Error", "Something went wrong")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Error Toast
        </button>
        <button
          onClick={() => toast.info("Info", "Here's some information")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Info Toast
        </button>
        <button
          onClick={() => toast.warning("Warning", "Be careful!")}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Warning Toast
        </button>
        <button
          onClick={() => toast.custom({
            title: "Custom Toast",
            description: "This is a custom toast with longer duration",
            variant: "info",
            duration: 15000,
            action: {
              label: "Click Me",
              onClick: () => alert("Action clicked!")
            }
          })}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Custom Toast
        </button>
      </div>
    </div>
  );
}