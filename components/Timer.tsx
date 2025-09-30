import React, { useState, useEffect, useMemo } from 'react';

const TimeBlock: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="bg-white text-gray-900 rounded-lg py-2 px-3 text-3xl font-bold shadow-md">
            {value.toString().padStart(2, '0')}
        </div>
        <span className="text-xs text-yellow-300 mt-2 uppercase tracking-widest">{label}</span>
    </div>
);

const Timer: React.FC = () => {
  // Set the offer to end in 24 hours from when the component is first rendered.
  const targetDate = useMemo(() => new Date().getTime() + 24 * 60 * 60 * 1000, []);

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date().getTime();
    
    if (difference > 0) {
      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);


  return (
    <div className="flex justify-center items-center space-x-3 my-6">
        <TimeBlock value={timeLeft.hours} label="ساعة" />
        <span className="text-white text-3xl font-bold">:</span>
        <TimeBlock value={timeLeft.minutes} label="دقيقة" />
        <span className="text-white text-3xl font-bold">:</span>
        <TimeBlock value={timeLeft.seconds} label="ثانية" />
    </div>
  );
};

export default Timer;