/* Copyright (C) Maria-Ramona Raducu - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Maria-Ramona Raducu <raducu.ramona95@gmail.com>, December 2018
*/


const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
};

const url = 'http://127.0.0.1:5000';

export const  getJson = (relativeUrl) => {
    return fetch(`${url}/${relativeUrl}`, {
                          method: 'GET',
                          headers: headers,
                })
       .then(res => {
            return res.json();
       })
       .then(data => {
           console.log("data GET::: ", data);
           return data;

       });
}

export const post = (relativeUrl, data) => {
    return fetch(`${url}/${relativeUrl}`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(data)
	})
	.then(res => {
		 return res.json()
	})
	.then(data => {
		return data;

	});
};


export function getAllBooks() {
  return [
          {"id": "id1", "title": "t1", "author": "a1"},
          {"id": "id2", "title": "t2", "author": "a2"}
        ];
}
