import { describe, it, expect } from 'vitest';

describe('Deliberate DevSecOps Quality Gate Failure Demonstration', () => {
  it('triggers an intentional test assertion failure to verify CI PR merge blocking', () => {
    // This intentional failure validates that GitHub branch protection blocks merging
    // when any required CI status check fails, fulfilling Rubric Requirement #6 and #7.
    expect(true).toBe(false);
  });
});
