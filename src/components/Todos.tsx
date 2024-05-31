import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_USER_TODOS = gql`
  query GetUserTodos($userId: ID!) {
    user(id: $userId) {
      todos {
        id
        title
        completed
      }
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodoCompletion($todoId: ID!, $completed: Boolean!) {
    updateTodoCompletion(id: $todoId, completed: $completed) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($todoId: ID!) {
    deleteTodo(id: $todoId)
  }
`;

const Todos: React.FC<{ userId: string }> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_TODOS, {
    variables: { userId },
  });

  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    refetchQueries: [{ query: GET_USER_TODOS, variables: { userId } }],
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_USER_TODOS, variables: { userId } }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { todos } = data.user;

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                toggleTodo({
                  variables: { todoId: todo.id, completed: !todo.completed },
                })
              }
            />
            {todo.title}
            <button
              onClick={() => deleteTodo({ variables: { todoId: todo.id } })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
