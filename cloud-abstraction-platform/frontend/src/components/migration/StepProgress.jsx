import React from "react";

const steps = ["Upload", "Analysis", "Plan", "Transform", "Execute"];

const StepProgress = ({ currentStage = 1 }) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    backgroundColor: "transparent",
    boxSizing: "border-box",
  };

  const stepWrapperStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
  };

  const lineStyle = (isActiveOrCompleted) => ({
    flex: 1,
    height: "2px",
    backgroundColor: isActiveOrCompleted ? "#3b82f6" : "#334155",
    margin: "0 8px",
    transition: "background-color 0.2s ease",
  });

  const circleStyle = (status) => {
    let backgroundColor = "#475569"; // pending neutral gray
    let borderColor = "#475569";
    let color = "#e5e7eb";

    if (status === "completed") {
      backgroundColor = "#22c55e"; // green
      borderColor = "#22c55e";
      color = "#ffffff";
    } else if (status === "active") {
      backgroundColor = "#3b82f6"; // blue
      borderColor = "#3b82f6";
      color = "#ffffff";
    }

    return {
      width: "28px",
      height: "28px",
      borderRadius: "999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: 600,
      color,
      backgroundColor,
      border: `1px solid ${borderColor}`,
      boxSizing: "border-box",
      transition:
        "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
    };
  };

  const labelStyle = (status) => {
    let color = "#9ca3af"; // neutral gray
    if (status === "completed") color = "#22c55e"; // green
    if (status === "active") color = "#e5e7eb"; // light for active

    return {
      marginTop: "6px",
      fontSize: "12px",
      fontWeight: 500,
      color,
      whiteSpace: "nowrap",
    };
  };

  const stepContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "80px",
  };

  const getStatus = (index) => {
    const stepNumber = index + 1;
    if (stepNumber < currentStage) return "completed";
    if (stepNumber === currentStage) return "active";
    return "pending";
  };

  return (
    <div style={containerStyle}>
      {steps.map((label, index) => {
        const status = getStatus(index);
        const isLast = index === steps.length - 1;
        const isActiveOrCompleted = index + 1 <= currentStage;

        return (
          <div key={label} style={stepWrapperStyle}>
            <div style={stepContainerStyle}>
              <div style={circleStyle(status)}>{index + 1}</div>
              <div style={labelStyle(status)}>{label}</div>
            </div>
            {!isLast && <div style={lineStyle(isActiveOrCompleted)} />}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;