import { useEffect, useState } from "react";

// export async function getServerSideProps() {
// const res = await fetch("http://localhost:3000/api/get-todos/");
// const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }

const index = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [reload, setReload] = useState();

  useEffect(() => {
    let getTodos = async () => {
      const res = await fetch("http://localhost:3000/api/get-todos/");
      const data = await res.json();
      setData(data);
    };
    getTodos();
  }, [reload]);

  const addTodo = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/add-todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("addTodo--->", data);
        setReload(data);
        setTitle("");
      })
      .catch((err) => {
        console.log("addTodo--error----->", err);
      });
  };
  return (
    <div className="w-2/4 p-3 flex flex-col items-center m-auto my-3 rounded-xl bg-blue-200">
      <div className="p-2 bg-blue-400 flex  rounded-lg">
        <h1 className="text-2xl text-white">Todos</h1>
        <select
          name=""
          id=""
          defaultValue="default"
          className="mx-2 rounded-md"
        >
          <option disabled value="default">
            Filter Todo
          </option>
          <option value="all">All</option>
          <option value="complite">Complite</option>
        </select>
      </div>
      <div className="my-2 flex">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <button
          onClick={addTodo}
          className="bg-green-500 text-white rounded-md ml-1"
        >
          Add Todo
        </button>
      </div>
      <div className="py-3 w-full">
        {data.map((todo, id) => (
          <div className="flex py-2" key={todo._id}>
            <p className="text-xl font-normal px-2 bg-yellow-100 rounded-lg mx-2">
              {id + 1}
            </p>
            <p className="text-xl font-normal flex-1">{todo.title}</p>
            <input
              onChange={(e) => console.log(e.target.value)}
              className="w-5 text-blue-600 bg-gray-100 border-gray-300 rounded "
              type="checkbox"
              name="complite"
              id=""
              value="off"
            />
            <button className="bg-red-500 text-white p-2 rounded-md mx-2">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
