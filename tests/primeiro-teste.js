import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '30s',
};

export default function() {
    const response = http.get("https://anchieta.br/")

    check(response, {
        'status is 200': (r) => r.status === 200,
        'response time is less than 400ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}