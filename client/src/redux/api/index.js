export const fetchCommits = async (sha, page) => {
  const response = await fetch(`/api/commits?sha=${sha}&page=${page}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};

export const fetchBuildSets = async () => {
  const response = await fetch('/api/buildsets');
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data.buildsets;
};

export const fetchBuildReq = async str => {
  const response = await fetch(`/api/buildreq?${str}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data.buildrequests;
};

export const fetchBuilds = async str => {
  const response = await fetch(`/api/builds?${str}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data.builds;
};

export const fetchBuilders = async () => {
  const response = await fetch('/api/builders');
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data.builders;
};

export const fetchBranches = async () => {
  const response = await fetch('/api/branches');
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};
export const fetchPulls = async (state, page) => {
  const response = await fetch(`/api/pulls?state=${state}&page=${page}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};
