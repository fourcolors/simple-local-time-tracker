import React, { useState } from "react";

const App: React.FC = () => {
  const [task, setTask] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleStart = () => {
    if (task.trim() !== "") {
      setIsTracking(true);
      setCurrentTask(task);
      setStartTime(new Date());
      setTask("");
    }
  };

  const handleStop = () => {
    setIsTracking(false);
    // In a real app, we would save the time record here
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Simple Time Tracker</h1>
      
      {isTracking ? (
        <div>
          <h2>Currently tracking: {currentTask}</h2>
          <p>Started at: {startTime?.toLocaleTimeString()}</p>
          <button 
            onClick={handleStop}
            style={{
              backgroundColor: "#ff4757",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Stop Tracking
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="task" style={{ display: "block", marginBottom: "5px" }}>Task Name:</label>
            <input
              id="task"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid #ddd"
              }}
            />
          </div>
          <button 
            onClick={handleStart}
            disabled={task.trim() === ""}
            style={{
              backgroundColor: "#2ecc71",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: task.trim() === "" ? "not-allowed" : "pointer",
              fontSize: "16px",
              opacity: task.trim() === "" ? 0.7 : 1
            }}
          >
            Start Tracking
          </button>
        </div>
      )}
    </div>
  );
};

export default App;