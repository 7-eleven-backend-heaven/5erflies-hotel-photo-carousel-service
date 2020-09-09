import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 1 },
    { duration: '1s', target: 10 },
    { duration: '1s', target: 100 },
  ]
};

export default () => {
  let id = Math.floor((Math.random() * 10000000) + 1);
  let res = http.get(`http://localhost:5000/properties/${id}`);
  check(res, { 'status is 200': r => r.status === 200 });
  sleep(1);
}
