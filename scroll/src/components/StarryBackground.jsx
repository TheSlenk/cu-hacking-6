import React, { useEffect } from "react";

const StarryBackground = () => {
  useEffect(() => {
    const bgContainer = document.getElementById("bg-container");
    if (bgContainer) {
      bgContainer.appendChild(createStarsBackground());
    }

    return () => {
      // Cleanup: Remove the background when the component unmounts
      if (bgContainer) bgContainer.innerHTML = "";
    };
  }, []);

  function createStarsBackground(
    numStarGroups = 8,
    starsPerGroup = 75
  ) {
    return createBg();

    function createBg() {
      let bg = document.createElement("div");
      bg.id = "bg";
      bg.appendChild(addStyleTag());

      for (let i = 0; i < numStarGroups - 1; i++) {
        bg.appendChild(createStarGroup());
      }
      bg.appendChild(createStarGroup()); // One static group

      return bg;
    }

    function createStarGroup(
      minAnimLength = 4,
      maxAnimLength = 8
    ) {
      const animVariance = maxAnimLength - minAnimLength;
      let starGroup = document.createElement("div");
      let animDuration = minAnimLength + Math.floor(Math.random() * animVariance);
      let animDelay = -1 * Math.floor(Math.random() * animDuration);

      starGroup.classList.add("star-group");
      starGroup.style.animationDuration = `${animDuration}s`;
      starGroup.style.animationDelay = `${animDelay}s`;

      for (let j = 0; j < starsPerGroup; j++) {
        starGroup.appendChild(createStar());
      }

      return starGroup;
    }

    function createStar(minSize = 0.5, maxSize = 2.5){
      const sizeVariance = maxSize - minSize;
      let star = document.createElement("span");
      let x = Math.random() * 100;
      let y = Math.random() * 100;
      let size = Math.random() * sizeVariance + minSize;

      star.classList.add("star");
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;

      return star;
    }

    function addStyleTag() {
      let styleTag = document.createElement("style");
      styleTag.innerHTML = `
        #bg { background: linear-gradient(#000000, #18182e, #000000); position: absolute; inset: 0; }
        .star-group {
          animation: twinkle infinite linear;
          position: absolute;
          width: 100%;
          height: 100%;
        }
        @keyframes twinkle { 0%, 100% { opacity: 0.75; } 50% { opacity: 0; } }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
        }
      `;
      return styleTag;
    }
  }

  return <div id="bg-container" className="absolute inset-0 z-[-1]"></div>;
};

export default StarryBackground;
