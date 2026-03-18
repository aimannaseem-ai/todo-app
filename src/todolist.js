import React from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      name
      description
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($name: String!, $description: String) {
    addTodo(name: $name, description: $description) {
      id
      name
      description
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, { refetchQueries: [{ query: GET_TODOS }] });
  const [toggleTodo] = useMutation(TOGGLE_TODO);

  if (loading) return <p style={{ color: 'white' }}>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  const handleAddTodo = async () => {
    const name = prompt('Todo name:');
    const description = prompt('Description:');
    if (name) {
      await addTodo({ variables: { name, description } });
    }
  };

  const handleToggle = async (id) => {
    await toggleTodo({ variables: { id } });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✨ My Todo App</h1>

      <button style={styles.button} onClick={handleAddTodo}>
        + Add Todo
      </button>

      <ul style={styles.list}>
        {data.getTodos.map((todo) => (
          <li key={todo.id} style={styles.card}>
            <span
              style={{
                ...styles.text,
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.6 : 1
              }}
              onClick={() => handleToggle(todo.id)}
            >
              <strong>{todo.name}</strong>
              <br />
              <small>{todo.description}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0f172a',
    minHeight: '100vh',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    display: 'block',
    margin: '0 auto 20px auto',
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    maxWidth: '500px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.2s',
  },
  text: {
    fontSize: '16px',
  },
};

export default TodoList;