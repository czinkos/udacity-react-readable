const api = "http://localhost:3001";

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchCategories = () =>
  fetch(api + '/categories', { headers })
    .then(res => res.json());

export const fetchPosts = category =>
  fetch(api + (category ? '/' + category : '') + '/posts', { headers })
    .then(res => res.json());

export const fetchPost = postId =>
  fetch(api + '/posts/' + postId, { headers })
    .then(res => res.json());

export const fetchComments = postId =>
  fetch(api + '/posts/' + postId + '/comments', { headers })
    .then(res => res.json());

export const fetchComment = commentId =>
  fetch(api + '/comments/' + commentId, { headers })
    .then(res => res.json());


export const setScore = (option, postId) =>
  fetch(api + '/posts/' + postId,
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: `{ "option": "${option}" }`
    })
    .then(res => res.json());


export const deletePost = postId =>
  fetch(api + '/posts/' + postId,
    {
      headers,
      method: 'DELETE'
    })
    .then(res => res.json());

export const updatePost = post =>
  fetch(api + '/posts/' + post.id,
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(post)
    })
    .then(res => res.json());

export const createPost = post =>
  fetch(api + '/posts',
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(post)
    })
    .then(res => res.json());

export const deleteComment = commentId =>
  fetch(api + '/posts/' + commentId,
    {
      headers,
      method: 'DELETE'
    })
    .then(res => res.json());

export const updateComment = comment =>
  fetch(api + '/comments/' + comment.id,
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(comment)
    })
    .then(res => res.json());

export const createComment = comment =>
  fetch(api + '/comments',
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(comment)
    })
    .then(res => res.json());

export const setCommentScore = (option, commentId) =>
  fetch(api + '/comments/' + commentId,
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: `{ "option": "${option}" }`
    })
    .then(res => res.json());