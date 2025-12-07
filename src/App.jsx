import { useState } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [record, setRecord] = useState([]);

  const handleSubmit = () => {
    if (todo.trim() === "") {
      alert("Please enter a todo!");
      return;
    }
    
    setRecord([...record, {text: todo, completed: false}])
    setTodo("")
  }

  const handleComplete = (index) => {
    const newTodo = [...record];
    newTodo[index].completed = !newTodo[index].completed;
    setRecord(newTodo);
  } 

  const handleDelete = (index) => {
    const newTodo = record.filter((_, i) => i !== index);
    setRecord(newTodo);
  }

  // Statistics
  const totalTodos = record.length;
  const completedTodos = record.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <>
      <div className='input-container'>
        <h2>📝 Todo Application</h2>
        <div className='input-tag'>
          <label>Add Todo: </label>
          <input
            type='text'
            name='todo'
            value={todo}
            onChange={(e) => { setTodo(e.target.value) }}
            placeholder="What needs to be done?"
          />
        </div>
        <div className='button-tag'>
          <button onClick={handleSubmit}>Add Todo</button>
        </div>
      </div>

      <div className='todo-list-container'>
        {/* Statistics Bar */}
        {record.length > 0 && (
          <div className="stats-bar">
            <div className="stats-item">
              <span className="stats-number">{totalTodos}</span>
              <span>Total</span>
            </div>
            <div className="stats-item">
              <span className="stats-number">{completedTodos}</span>
              <span>Completed</span>
            </div>
            <div className="stats-item">
              <span className="stats-number">{pendingTodos}</span>
              <span>Pending</span>
            </div>
          </div>
        )}

        {/* Todo List */}
        {record.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3>No Todos Yet</h3>
            <p>Add your first todo item above to get started!</p>
          </div>
        ) : (
          <ul>
            {record.map((todoItem, index) => (
              <li key={index}>
                <span style={{
                  textDecoration: todoItem.completed ? "line-through" : "none",
                  color: todoItem.completed ? "#95a5a6" : "#2c3e50"
                }}>
                  {todoItem.completed && <span className="completed-checkmark">✓</span>}
                  {todoItem.text}
                  <div>
                    <button onClick={() => handleComplete(index)}>
                      {todoItem.completed ? "Undo" : "Complete"}
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </div>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App