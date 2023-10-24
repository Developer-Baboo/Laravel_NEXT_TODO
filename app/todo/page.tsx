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

  useEffect(() => {
    fetchTodos();
  }, []);

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
          <form action="" method="post">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Typing...............!" /> 
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
                    <button  className='btn btn-primary btn-sm'>Edit</button> &nbsp; 
                    <button  className='btn btn-danger btn-sm'>Delete</button>
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