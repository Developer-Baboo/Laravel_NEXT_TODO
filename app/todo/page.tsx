'use client' // 👈 use it here
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

// Define the Todo interface
interface Todo {
  id: number;
  title: string;
}

const Todo: React.FC = () => {

  // State variables for todos, title, and todo ID
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [todoid, setTodoId] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle title input change
  const titleChange = (e) => {
    setTitle(e.target.value);
  }

// Handle form submission
  const submitForm = (e) => {
    e.preventDefault();
  // Check if title is empty before making the request
  if (!title) {
    console.error('Title cannot be empty');
    return;
  }
  var formData = new FormData();
  formData.append('title', title);
  // formData.append('id', todoid);
  formData.append('is_done', 0);

    let url = `api/todos`;
    const csrfToken = window.csrfToken;
  
  if (todoid !== '') {
    url = `api/todos/${todoid}`;
    // formData.append('_method', 'PUT');
  }

  // axios.put(url, formData, headers: {
  //       'X-CSRF-TOKEN': csrfToken
  //     })
  //   .then((response) => {
  //     setTitle('');
  //     fetchTodos();
  //     setTodoId('');
  //   })
  //   .catch((error) => {
  //     console.error('Error updating todo:', error);
    //   });


  // Make a POST or PUT request based on the existence of todo ID  
  axios({
      method: todoid !== '' ? 'put' : 'post',
      url: url,
      data: {title: title, _token:csrfToken},
    
    })
      .then((response) => {
        setTitle('');
        fetchTodos();
        setTodoId('');
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
}

// Function to edit a todo by ID
  function editTodo(id) {
    setTodoId(id);
  // Find and set the title of the todo to edit
  todos.forEach((item) => {
    if (item.id === id) {
      setTitle(item.title);
      return; // Break the loop after finding the matching item
    }
  });
  }

  // Function to delete a todo by ID
  function deleteTodo(id) {
    axios({
      method: 'delete',
      url: `api/todos/${id}`,
      data: {_token:window.csrfToken},
    })
    .then((response) => {
        fetchTodos();
      })
    .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  }
// Function to toggle the 'is_done' property of a todo by ID
  function isDoneTodo(id, is_done) {
  // Invert the 'is_done' status
    let params = { 'is_done': !is_done };
  // Send a POST request to update 'is_done'
  axios({
    method: 'post',
    url: `api/todos/done/${id}`, // Corrected template literal syntax
    data: { _token: window.csrfToken, ...params }, // Include params in data object if needed
  })
    .then((response) => {
      fetchTodos();
    })
    .catch((error) => {
      console.error('Error deleting todo:', error);
    });
}

// Function to fetch todos from the server
  function fetchTodos() {
    axios
      .get('/api/todos')
      .then((res) => {
        setTodos(res.data);
        console.log(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

   // Log the updated todos whenever the 'todos' state changes
   useEffect(() => {
    console.log(todos);
   }, [todos]);
  // JSX code representing the Todo component
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Todo Application</h1>
      <div className="row justify-content-center">
        <div className="col-sm-7">
          <form className='mt-3'  method="POST" onSubmit={submitForm}>
            <div className="input-group mb-3">
              <input type="text" className="form-control"
                placeholder="Add Todo List"
                name='title'
                value={title}
                onChange={titleChange}/> 
              <div className="input-group-append ml-2">
                <button type='submit' className="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
          
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>is Done</th>
                <th>SNO#</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {todos.length > 0 ? (
            <tbody>
              {todos.map((item) => (
                <tr key={item.id} className={item.is_done ? 'text-decoration-line-through': ''} >
                  <td>
                    <input
                      type="checkbox"
                      className='form-check-input'
                      checked={item.is_done}
                      onChange={()=>isDoneTodo(item.id, item.is_done)}
                      name="" id="" />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <button
                      className='btn btn-primary btn-sm'
                      onClick={()=> editTodo(item.id)}
                    >Edit</button> &nbsp; 
                    <button className='btn btn-danger btn-sm'
                      onClick={() => deleteTodo(item.id)}
                    >Delete</button>
                    {/* <Link href={`/todo/${item.id}`}>
                    </Link> */}
                  </td>
                </tr>
              ))}
              </tbody>
            ) : (
              // Message when no todos are found
              <div className="text-center mt-3" style={{ color: 'red', fontSize: '18px' }}>
                No data found in the database.
              </div>
            )}
          </table>
        </div>
      </div>

    </div>
  );
};

export default Todo;