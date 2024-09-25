"use client"

import React from 'react'
import HashLoader from 'react-spinners/HashLoader';

const Loading = () => {

      const colors = [
        "#E11C49",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
      ];
      const [currentColor, setCurrentColor] = React.useState(colors[0]);
    const [colorIndex, setColorIndex] = React.useState(0);
    
      React.useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(colorChangeInterval);
  }, [colors.length]);

  React.useEffect(() => {
    setCurrentColor(colors[colorIndex]);
  }, [colorIndex, colors]);
    
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <span className="flex-none text-3xl animate-pulse font-semibold text-gray-200 dark:text-gray-100">
        Enterbox
      </span>
      <span className='text-[15px] animate-pulse text-gray-400'>Initializing...</span>
      <HashLoader color={currentColor} size={30} />
    </div>
  );
}

export default Loading