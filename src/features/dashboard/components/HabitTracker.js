import React, { useState, useEffect } from 'react';

// Habit Card Component
const generateId = () => {
  return Math.floor(Math.random() * 1000000); // Adjust range as needed
};

const HabitCard = ({ day, tasks, progress }) => {
  return (
    <div className="card bg-base-100 shadow-xl m-4">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{day}</h2>
        <ul className="list-disc pl-5 mt-2">
          {tasks.map((task, index) => (
            <li key={index} className="text-base">{task}</li>
          ))}
        </ul>
        <div className="mt-4">
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max={tasks.length}
          ></progress>
          <p className="text-sm text-gray-600 mt-1">
            {progress} of {tasks.length} completed
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Component
const HabitTracker = () => {
  const [habitData, setHabitData] = useState([]);
  const [day, setDay] = useState("");
  const [tasks, setTasks] = useState("");
  const [progress, setProgress] = useState("");

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('http://localhost:3000/habits');

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const habits = await response.json();
        setHabitData(habits);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, []);
  
  const addHabit = async () => {
    if (!day || !tasks || !progress) {
      alert('Please fill in all fields');
      return;
    }
    try{
      const newHabit = {
        id: generateId(),
        day,
        tasks: tasks.split(',').map(task => task.trim()), // Split tasks by comma and trim spaces
        progress: parseInt(progress, 10) || 0 // Ensure progress is an integer
      };
      
      console.log('Adding habit:', JSON.stringify(newHabit),);
      const response = await fetch('http://localhost:3000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Ensure the server knows to expect JSON
      },
      body: JSON.stringify(newHabit)
    });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      setHabitData([...habitData, newHabit]);
      // Clear the input fields
      setDay("");
      setTasks("");
      setProgress("");
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {habitData.map((habit, index) => (
        <HabitCard key={index} {...habit} />
      ))}
      <div className="w-full flex flex-col items-center mt-4">
        <input type="text" value={day} onChange={e => setDay(e.target.value)} placeholder="Day" className="input input-bordered mb-2" />
        <input type="text" value={tasks} onChange={e => setTasks(e.target.value)} placeholder="Tasks (comma-separated)" className="input input-bordered mb-2" />
        <input type="number" value={progress} onChange={e => setProgress(e.target.value)} placeholder="Progress" className="input input-bordered mb-2" />
        <button onClick={addHabit} className="btn btn-primary">Add Habit</button>
      </div>
    </div>
  );
};

export default HabitTracker;