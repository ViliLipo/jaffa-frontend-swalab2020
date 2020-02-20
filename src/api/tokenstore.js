class TokenStore {
  constructor(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    console.log(token);
    this.token = token;
  }
}


const tokenstore = new TokenStore('');

export default tokenstore;
