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

export const fetchPosts = (category) =>
  fetch(api + (category ? '/' + category : '') + '/posts', { headers })
    .then(res => res.json());

export const fetchPost = (category, postId) =>
  fetch(api + '/' + category + '/' + postId, { headers })
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


export const deletePost = (option, postId) =>
  fetch(api + '/posts/' + postId,
    {
      headers,
      method: 'DELETE'
    })
    .then(res => res.json());