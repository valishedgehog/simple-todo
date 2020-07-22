import { gql } from "@apollo/react-hooks";

const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      text
      done
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
      returning {
        id
        text
        done
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodos($text: String!) {
    insert_todos(objects: { text: $text }) {
      returning {
        id
        text
        done
      }
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: uuid!) {
    delete_todos(where: { id: { _eq: $id } }) {
      returning {
        id
        text
        done
      }
    }
  }
`;

export { GET_TODOS, ADD_TODO, DELETE_TODO, TOGGLE_TODO };
