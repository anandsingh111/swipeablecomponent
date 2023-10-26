import React, { useState } from 'react';

const SwipeableTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      const deltaX = e.touches[0].clientX - touchStartX;
      if (deltaX > 50 && activeTab > 0) {
        handleTabChange(activeTab - 1);
        setTouchStartX(null);
      } else if (deltaX < -50 && activeTab < 2) {
        handleTabChange(activeTab + 1);
        setTouchStartX(null);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  return (
    <div>
      <div className="tab-buttons">
        <button
          className={activeTab === 0 ? 'active' : ''}
          onClick={() => handleTabChange(0)}
        >
          Tab 1
        </button>
        <button
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => handleTabChange(1)}
        >
          Tab 2
        </button>
        <button
          className={activeTab === 2 ? 'active' : ''}
          onClick={() => handleTabChange(2)}
        >
          Tab 3
        </button>
      </div>
      <div
        className="tab-content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            transform: `translateX(-${activeTab * 100}%)`,
            transition: 'transform 0.3s ease',
            display: 'flex',
            width: '300%'
          }}
        >
          <div className="tab-pane">
            <h2>Tab 1 Content</h2>
            <p>This is the content for Tab 1.</p>
          </div>
          <div className="tab-pane">
            <h2>Tab 2 Content</h2>
            <p>This is the content for Tab 2.</p>
          </div>
          <div className="tab-pane">
            <h2>Tab 3 Content</h2>
            <p>This is the content for Tab 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeableTabs;
