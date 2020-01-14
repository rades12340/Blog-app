import createDataContext from './createDataContext';
import {act} from 'react-test-renderer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [
        ...state,
        {
          id: `${Math.floor(Math.random() * 999999999)}`,
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case 'delete_blogpost':
      return state.filter(blog => blog.id !== action.payload);
    case 'update_blogpost':
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog,
      );
    default:
      return state;
  }
};

const addBlogPost = dispatch => {
  return (title, content, callback) => {
    dispatch({type: 'add_blogpost', payload: {title, content}});
    callback();
  };
};

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({type: 'delete_blogpost', payload: id});
  };
};

const updateBlogPost = dispatch => {
  return (id, title, content, callback) => {
    dispatch({type: 'update_blogpost', payload: {title, content, id}});
    callback();
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, deleteBlogPost, updateBlogPost},
  [
    {id: '1', title: 'TEST POST', content: 'TEST CONTENT'},
    {id: '2', title: 'TEST POST2', content: 'TEST CONTENT2'},
  ],
);
