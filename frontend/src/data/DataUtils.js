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
           console.log('================ Rezultat', res);
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
		console.log("dataPOOOOOOST:", data);
		return data;

	});
};


export function getAllBooks() {
  return [
          {"id": "id1", "title": "t1", "author": "a1"},
          {"id": "id2", "title": "t2", "author": "a2"}
          ];
}
