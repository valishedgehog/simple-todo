import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TODOS, TOGGLE_TODO, ADD_TODO, DELETE_TODO } from "./actions";

function App() {
  const [todoText, setTodoText] = React.useState("");
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO, {});
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => {
      setTodoText("");
    },
  });

  if (error) {
    console.log(error);

    return (
      <div className="vh-100 code flex flex-column items-center bg-purple white">
        <h1 className="f1">Some error occured :(</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="vh-100 code flex flex-column items-center bg-purple white">
        <h1 className="f1">loading...</h1>
      </div>
    );
  }

  async function handleAddTodo(event) {
    event.preventDefault();
    if (!todoText.trim()) return;
    await addTodo({
      variables: { text: todoText },
      refetchQueries: [{ query: GET_TODOS }],
    });
  }

  async function handleToggleTodo({ id, done }) {
    await toggleTodo({
      variables: {
        id: id,
        done: !done,
      },
    });
  }

  async function handleDeleleTodo({ id }) {
    const isConfirmed = window.confirm("Do you want to delete this todo?");
    if (!isConfirmed) return;

    await deleteTodo({
      variables: {
        id: id,
      },
      update: (cache) => {
        const prevData = cache.readQuery({ query: GET_TODOS });
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: prevData.todos.filter((todo) => todo.id !== id) },
        });
      },
    });
  }

  return (
    <div className="vh-100 code flex flex-column items-center bg-purple white pa2 fl2">
      <h1 className="f2-1">
        React + GraphQL Checklist
        <span role="img" aria-label="Checkmark">
          ✅
        </span>
      </h1>

      {/* Todo From */}
      <form className="mb3 form" onSubmit={(event) => handleAddTodo(event)}>
        <input
          className="pa2 f4 b--dashed"
          type="text"
          placeholder="Write your todo"
          onChange={(event) => setTodoText(event.target.value)}
          value={todoText}
        />
        <input
          className="pa2 f4 bg-green b--dashed"
          type="submit"
          value="Create"
        />
      </form>

      {/* Todo list */}
      {data.todos.map((todo) => (
        <div
          className="flex items-center justify-center flex-column"
          key={todo.id}
        >
          <p onDoubleClick={() => handleToggleTodo(todo)}>
            <span
              className={`pointer list pa1 f3 noselect ${
                todo.done && "strike"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDeleleTodo(todo)}
              className="bg-red bn f3"
            >
              &times;
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
