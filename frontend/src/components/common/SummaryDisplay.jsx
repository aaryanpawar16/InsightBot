import React from 'react';

// This component takes the raw summary text and formats it into a structured view.
const SummaryDisplay = ({ summaryText }) => {
  // A helper function to parse the text into sections
  const parseSummary = (text) => {
    const sections = {
      "Key Points": [],
      "Decisions": [],
      "Action Items": [],
    };

    // Split the text by the main headings
    const keyPointsSplit = text.split('Decisions:');
    const decisionsSplit = keyPointsSplit[1] ? keyPointsSplit[1].split('Action Items:') : ['', ''];
    
    const keyPointsText = keyPointsSplit[0].replace('Key Points:', '').trim();
    const decisionsText = decisionsSplit[0].trim();
    const actionItemsText = decisionsSplit[1] ? decisionsSplit[1].trim() : '';

    // A function to split each section's text into list items
    const getListItems = (sectionText) => {
        if (!sectionText) return [];
        // Split by newline and filter out any empty lines
        return sectionText.split(/\d+\.\s|\n-|\n•/).filter(item => item.trim() !== '');
    };

    sections["Key Points"] = getListItems(keyPointsText);
    sections["Decisions"] = getListItems(decisionsText);
    sections["Action Items"] = getListItems(actionItemsText);

    return sections;
  };

  const parsedSummary = parseSummary(summaryText);

  return (
    <div className="summary-container">
      <h2 className="summary-title">Meeting Summary</h2>
      
      {/* Render Key Points Section */}
      {parsedSummary["Key Points"].length > 0 && (
        <div className="summary-section">
          <h3 className="summary-heading">Key Points</h3>
          <ul className="summary-list">
            {parsedSummary["Key Points"].map((item, index) => (
              <li key={`kp-${index}`} className="summary-list-item">{item.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Render Decisions Section */}
      {parsedSummary["Decisions"].length > 0 && (
        <div className="summary-section">
          <h3 className="summary-heading">Decisions</h3>
          <ul className="summary-list">
            {parsedSummary["Decisions"].map((item, index) => (
              <li key={`d-${index}`} className="summary-list-item">{item.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Render Action Items Section */}
      {parsedSummary["Action Items"].length > 0 && (
        <div className="summary-section">
          <h3 className="summary-heading">Action Items</h3>
          <ul className="summary-list">
            {parsedSummary["Action Items"].map((item, index) => (
              <li key={`ai-${index}`} className="summary-list-item">{item.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SummaryDisplay;
