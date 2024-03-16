// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_URL;

// function TodoList() {
//   const [todos, setTodos] = useState([]);
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${BASE_URL}/api/todos`, { headers: { 'x-auth-token': token } });
//         setTodos(response.data);
//       } catch (error) {
//         console.error('Error fetching todos:', error.response ? error.response.data : error.message);
//       }
//     };

//     fetchTodos();
//   }, []);

//   const handleAddTodo = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(`${BASE_URL}/api/todos`, { title, body, status }, { headers: { 'x-auth-token': token } });
//       // Redirect to view todos page after adding a new todo
//       window.location.href = "/view-todos";
//     } catch (error) {
//       if (error.response && error.response.data) {
//         console.error('Error adding todo:', error.response.data);
//       } else {
//         console.error('Error adding todo:', error.message);
//       }
//     }
//   };

//   const handleDeleteTodo = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`${BASE_URL}/api/todos/${id}`, { headers: { 'x-auth-token': token } });
//       // Refresh todos after deleting one
//       window.location.reload();
//     } catch (error) {
//       console.error('Error deleting todo:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Todo List</h2>
//       <input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
//       <input type="text" placeholder="Enter body" value={body} onChange={(e) => setBody(e.target.value)} />
//       <select value={status} onChange={(e) => setStatus(e.target.value)}>
//         <option value="">Select status</option>
//         <option value="pending">Pending</option>
//         <option value="completed">Completed</option>
//       </select>
//       <button onClick={handleAddTodo}>Add Todo</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo._id}>
//             {todo.title}
//             <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TodoList;
