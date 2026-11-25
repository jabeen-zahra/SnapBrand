import http from 'k6/http';
import { check, sleep } from 'k6';

// ==============================================================================
// SnapBrand Auto Scaling Group (ASG) Stress & Load Test
// Demonstrates automatic Scale-Out under load and Scale-In upon cooldown
// ==============================================================================

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // ramp-up
    { duration: '3m', target: 150 },  // heavy load: triggers scale-out
    { duration: '5m', target: 150 },  // sustained peak
    { duration: '1m', target: 0 },    // ramp-down: scale-in follows after cooldown
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.01'],   // Error rate must stay below 1%
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:5000';

export default function () {
  // 1. Health check probe
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'health check status is 200': (r) => r.status === 200,
  });

  // 2. Fetch templates list
  const templatesRes = http.get(`${BASE_URL}/api/v1/templates`);
  check(templatesRes, {
    'templates returned 200': (r) => r.status === 200,
  });

  // 3. Dynamic Edge Render Stress test
  const titles = ['DevOps+Scale', 'CloudWatch+Alerts', 'Multi-AZ+High+Availability', 'SnapBrand+Studio'];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const renderRes = http.get(`${BASE_URL}/api/v1/render/og?title=${randomTitle}&theme=cyber`);
  
  check(renderRes, {
    'dynamic render returned 200': (r) => r.status === 200,
    'correct content-type header': (r) => r.headers['Content-Type'].includes('image/svg+xml'),
  });

  sleep(0.1);
}
