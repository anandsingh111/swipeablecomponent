import React, { useState, useRef } from 'react';

const SwappableTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const tabContentRef = useRef(null);
  const touchStartX = useRef(null);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current !== null) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null) {
      const tabContentWidth = tabContentRef.current.clientWidth;
      const touchEndX = touchStartX.current;
      const deltaX = touchEndX - touchStartX.current;

      if (Math.abs(deltaX) > tabContentWidth / 4) {
        if (deltaX < 0 && activeTab < 3) {
          handleTabChange(activeTab + 1);
        } else if (deltaX > 0 && activeTab > 1) {
          handleTabChange(activeTab - 1);
        }
      }

      touchStartX.current = null;
    }
  };

  return (
    <div>
      <div className="tab-buttons">
        <button
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => handleTabChange(1)}
        >
          Tab 1
        </button>
        <button
          className={activeTab === 2 ? 'active' : ''}
          onClick={() => handleTabChange(2)}
        >
          Tab 2
        </button>
        <button
          className={activeTab === 3 ? 'active' : ''}
          onClick={() => handleTabChange(3)}
        >
          Tab 3
        </button>
      </div>
      <div
        ref={tabContentRef}
        className="tab-content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {activeTab === 1 && (
          <div>
            <h2>Tab 1 Content</h2>
            <p>This is the content for Tab 1.</p>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2>Tab 2 Content</h2>
            <p>This is the content for Tab 2.</p>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2>Tab 3 Content</h2>
            <p>This is the content for Tab 3.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwappableTabs;
