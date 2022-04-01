import axios from 'axios';

export default class {
  constructor(options) {
    this.instance = axios.create(options);
  }
}
