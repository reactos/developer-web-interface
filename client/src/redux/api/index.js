export const fetchCommits = async (sha, page) => {
  const response = await fetch(`/api/github/commits?sha=${sha}&page=${page}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};

export const fetchTests = async (startrev, endrev, page) => {
  let results = [];
  let keepGoing = true;
  while (keepGoing) {
    const response = await fetch(
      `/api/testman/testman?startrev=${startrev}&endrev=${endrev}&page=${page}`
    );
    let data = await response.json();
    results.push(data.results.result);
    if (parseInt(data.results.resultcount._text) > 10) {
      page++;
    } else {
      keepGoing = false;
      return results.flat();
    }
    if (response.status >= 400) {
      console.log(response.status);
      throw new Error(data.errors);
    }
  }
};

export const fetchBuildSets = async str => {
  if (str) {
    const response = await fetch(`/api/buildbot/buildsets?${str}`);
    const data = await response.json();
    if (response.status >= 400) {
      throw new Error(data.errors);
    }
    return data.buildsets;
  }
};

export const fetchBuildReq = async str => {
  if (str) {
    const response = await fetch(`/api/buildbot/buildreq?${str}`);
    const data = await response.json();
    if (response.status >= 400) {
      throw new Error(data.errors);
    }
    return data.buildrequests;
  }
};

export const fetchBuilds = async str => {
  const response = await fetch(`/api/buildbot/builds?${str}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data.builds;
};

export const fetchBuilders = async () => {
  const response = await fetch('/api/buildbot/builders');
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data.builders;
};

export const fetchBranches = async () => {
  const response = await fetch('/api/github/branches');
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};
export const fetchPulls = async (state, page) => {
  const response = await fetch(`/api/github/pulls?state=${state}&page=${page}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};
