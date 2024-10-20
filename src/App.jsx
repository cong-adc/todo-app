import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { CircleX, PencilIcon } from 'lucide-react';


const formatDate = (date) => {

  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // -> 0 - 11
  const year = dateObj.getFullYear();

  const hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const ampm = hours >= 12 ? 'PM' : 'AM';

  return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({
    text: '',
    id: '',
    status: ''
  });
  const [filter, setFilter] = useState('all');
  const [isShowAdd, setIsShowAdd] = useState(false);

  const handleAdd = () => {
    const newTask = {
      text: currentTask.text,
      date: formatDate(new Date()),
      id: Date.now(),
      status: 'doing'
    };

    setTasks([...tasks, newTask]);
    setCurrentTask({ text: '', id: '', status: '' });
  }


  const handleDelete = (id) => {

    const newTasks = tasks.filter(t => t.id !== id);

    setTasks(newTasks);
  }

  const handleEdit = (task) => {

    setCurrentTask({
      ...task,
      editing: true
    });
  }

  const handleClickEdit = () => {
    const newTaskIndex = tasks.findIndex(t => t.id === currentTask.id);

    if (newTaskIndex !== -1) {
      const newTasks = [...tasks];
      newTasks.splice(newTaskIndex, 1, currentTask);

      setTasks(newTasks);

      setCurrentTask({ text: '', id: '', status: '' });
    }
  }

  const handleChangeStatus = (task) => {

    const currentIndex = tasks.findIndex(t => t.id === task.id);

    if (currentIndex !== -1) {
      const newTasks = [...tasks];

      newTasks[currentIndex].status = newTasks[currentIndex].status === 'doing' ? 'done' : 'doing';

      setTasks(newTasks);
    }
  }

  const handleSelect = (e) => {
    const filter = e.target.value;
    setFilter(filter);
  }


  // filter => true tra thang do ve, nguoc  thi khong tra

  const filterTasks = tasks.filter((t, index) => {
    if (filter === 'all') return true;

    console.log('status', index);
    console.log('filter', filter);
    console.log('t.status', t.status);
    // if(t.status === filter) return true;
    // return false
    return t.status === filter; // done === doing
  });


  const handleKeyDown = (e) => {
    console.log(e);

    if (e.key === 'Enter' || e.keyCode === 13) {
      currentTask.editing ? handleClickEdit() : handleAdd();
    }
  }

  return (
    <>
      <h1>TODO APP</h1>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}>
        <button onClick={() => {
          setIsShowAdd(!isShowAdd);
          setCurrentTask({ text: '', id: '', status: '' });
        }}>Add Task</button>
        {
          isShowAdd && <div>
            <input value={currentTask.text} onKeyDown={handleKeyDown} onChange={e => setCurrentTask({ ...currentTask, text: e.target.value })} />
            {
              currentTask.editing ?
                <button onClick={handleClickEdit}>Edit</button>
                : <button onClick={handleAdd}>Add</button>
            }
          </div>
        }
        <div>
          <select value={filter} onChange={handleSelect}>
            <option value={'all'}>
              All
            </option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* content */}
      <div>
        <ul>
          {
            filterTasks.map(task => (
              <li key={task.id} style={{ display: 'flex', alignItems: 'center' }}>
                <input type='checkbox' checked={task.status === 'done'} onChange={() => handleChangeStatus(task)} />
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <p style={{
                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                    color: task.status === 'done' ? 'gray' : 'black'
                  }}>
                    {task.text}
                  </p>
                  <span style={{
                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                    color: task.status === 'done' ? 'gray' : 'black'
                  }}>{task.date}</span>
                </div>
                <div>
                  <button onClick={() => handleDelete(task.id)}><CircleX /></button>
                  <button onClick={() => handleEdit(task)}><PencilIcon /></button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default App
