'use client' // 👈 use it here
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "@/lib/axios";
import { useEffect, useState} from "react";

const Todo: React.FC = () => {
  useEffect(() => {
    fetchTodos();
  }, []);
  function fetchTodos() {
    axios
      .get('/api/todos')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
                <tr>
                  <td>1</td>
                  <td>fdgdf</td>
                  <td>dfgdfg</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Todo;