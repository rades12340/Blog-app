import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blog_posts':
      return action.payload;
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

const getBlogPosts = dispatch => {
  return async () => {
    const posts = await jsonServer.get('/blogposts');
    console.log(posts.data);
    dispatch({type: 'get_blog_posts', payload: posts.data});
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    const data = await jsonServer.post('/blogposts', {title, content});
    if (callback && data) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({type: 'delete_blogpost', payload: id});
  };
};

const updateBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {title, content});
    dispatch({type: 'update_blogpost', payload: {title, content, id}});
    callback();
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, deleteBlogPost, updateBlogPost, getBlogPosts},
  [],
);
