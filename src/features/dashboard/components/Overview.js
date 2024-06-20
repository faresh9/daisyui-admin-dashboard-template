import React, { useState, useEffect } from 'react';
import PrayerTime from './PrayerTime'; // Ensure to import your clock component
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi'; // For quick action icons

const Overview = ({ tasks, habits }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };


  

  return (
    <div className="flex flex-col gap-4 bg-base-100 p-6 rounded-lg shadow-md w-full">
      {/* Current Time and Date */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold bg-base-100">
            {formatDate(currentTime)}
          </h2>
          <p className="text-lg bg-base-100">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
       <PrayerTime fajr="5:00 AM" dhuhr="1:00 PM" asr="5:00 PM" maghrib="8:00 PM" isha="10:00 PM" />
      </div>

      {/* Daily Tasks Summary */}
      <div className="bg-base-200 p-4 rounded-lg">
        <h3 className="text-xl font-semibold bg-base-100 mb-2">Today's Tasks</h3>
        {tasks.length === 0 ? (
          <p className="bg-base-200">No tasks for today.</p>
        ) : (
          <ul className="list-disc list-inside">
            {tasks.map((task, index) => (
              <li key={index} className="bg-base-200">{task.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Habit Progress */}
      <div className="bg-base-200 p-4 rounded-lg">
        <h3 className="text-xl font-semibold bg-base-100 mb-2">Habit Progress</h3>
        {habits.length === 0 ? (
          <p className="text-gray-600">No habits tracked today.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {habits.map((habit, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className={`inline-block w-4 h-4 rounded-full ${habit.completed ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className="bg-base-200">{habit}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link to="/add-task" className="btn btn-primary flex items-center gap-2">
          <HiPlus /> Add Task
        </Link>
        <Link to="/add-habit" className="btn btn-secondary flex items-center gap-2">
          <HiPlus /> Add Habit
        </Link>
      </div>
    </div>
  );
};

export default Overview;
