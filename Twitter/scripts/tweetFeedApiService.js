/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
class TweetFeedApiService {
  constructor(url) {
    this.apiUrl = url;
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    const filterConfigString = Object.keys(filterConfig).map((key) => `${key}=${filterConfig[key]}`).join('&');
    const path = `${this.apiUrl}tweet?${filterConfigString}&from=${skip}&count=${top}`;
    return this._dataFrom(fetch(path));
  }

  login(login, password) {
    const path = `${this.apiUrl}login`;
    const data = {
      login,
      password,
    };
    return this._dataFrom(fetch(path, {
      method: 'POST',
      headers: this._getHeadersWithoutAuthToken(),
      body: JSON.stringify(data),
    }));
  }

  signup(login, password) {
    const path = `${this.apiUrl}registration`;
    const data = {
      login,
      password,
    };
    return this._dataFrom(fetch(path, {
      method: 'POST',
      headers: this._getHeadersWithoutAuthToken(),
      body: JSON.stringify(data),
    }));
  }

  addTweet(text) {
    const path = `${this.apiUrl}tweet`;
    const data = {
      text,
    };
    return this._dataFrom(fetch(path, {
      method: 'POST',
      headers: this._getHeadersWithAuthToken(),
      body: JSON.stringify(data),
    }));
  }

  editTweet(id, text) {
    const path = `${this.apiUrl}tweet/${id}`;
    const data = {
      text,
    };
    return this._dataFrom(fetch(path, {
      method: 'PUT',
      headers: this._getHeadersWithAuthToken(),
      body: JSON.stringify(data),
    }));
  }

  deleteTweet(id) {
    const path = `${this.apiUrl}tweet/${id}`;
    return this._dataFrom(fetch(path, {
      method: 'DELETE',
      headers: this._getHeadersWithAuthToken(),
    }));
  }

  addComment(id, text) {
    const path = `${this.apiUrl}tweet/${id}/comment`;
    const data = {
      text,
    };
    return this._dataFrom(fetch(path, {
      method: 'POST',
      headers: this._getHeadersWithAuthToken(),
      body: JSON.stringify(data),
    }));
  }

  _getHeadersWithAuthToken() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  _getHeadersWithoutAuthToken() {
    return {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async _dataFrom(promise) {
    try {
      const response = await promise;
      const result = await response.json();
      return response.ok ? result : Promise.reject(result);
    } catch (error) {
      return 'вряд ли такое произойдет';
    }
  }
}

// const tweetFeedApiService = new TweetFeedApiService('https://jslabapi.datamola.com/');

// window.tweetFeedApiService = tweetFeedApiService;
export default TweetFeedApiService;
