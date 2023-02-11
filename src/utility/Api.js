const onResponce = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
	constructor({ baseUrl, token }) {
		this._token = `Bearer ${token}`;
		this._baseUrl = baseUrl;
	}

	getProductList() {
		return fetch(`${this._baseUrl}/products`, {
			headers: {
				authorization: this._token,
				'Content-type': 'application/json'
			},
		}).then(onResponce);
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._token,
				'Content-type': 'application/json'
			},
		}).then(onResponce);
	}
	
	search(searchQuery){

		if (!searchQuery) {
			return this.getProductList();
		}
		
        return fetch(
			`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: {
                authorization: this._token,
				'Content-type': 'application/json'
            },
        }).then(onResponce)
    }
	changeLikeProductStatus(productId, isLike) {
		return fetch(`${this._baseUrl}/products/likes/${productId}`, {
			method: isLike ? "DELETE" : "PUT",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
		}).then(onResponce);
	}
	
}

const config = {
    baseUrl:'https://api.react-learning.ru',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMjgyNTU5Yjk4YjAzOGY3N2IyMTgiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzAwNDIwLCJleHAiOjE3MDcyMzY0MjB9.iMCP_CQ0es5RaQI0LSEmoBuwMwEx3tNSvrtZUJn5ufM"
}



const api = new Api(config)

export default api;