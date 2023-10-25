'use client' // 👈 use it here
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}

const Todo: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [todoid, setTodoId] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const titleChange = (e) => {
    setTitle(e.target.value);
  }

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


  function editTodo(id) {
  setTodoId(id);
  todos.forEach((item) => {
    if (item.id === id) {
      setTitle(item.title);
      return; // Break the loop after finding the matching item
    }
  });
  }

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
   useEffect(() => {
    // This will log the updated state whenever `todos` changes
    console.log(todos);
  }, [todos]);
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Todo</h1>
      <div className="row justify-content-center">
        <div className="col-sm-7">
          <form className='mt-3'  method="POST" onSubmit={submitForm}>
            <div className="input-group mb-3">
              <input type="text" className="form-control"
                placeholder="Typing...............!"
                name='title'
                value={title}
                onChange={titleChange}/> 
              <div className="input-group-append">
                <button type='submit' className="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">CDN</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((item) => (
                <tr key={item.id}>
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
          </table>
        </div>
      </div>

    </div>
  );
};

export default Todo;