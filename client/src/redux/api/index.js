const fetchCommits = async (sha, page) => {
 const response = await fetch(`/api/commits?sha=${sha}&page=${page}`);
 const data = await response.json();
 if (response.status >= 400) {
  throw new Error(data.errors);
 }
 return data;
};

const fetchBranches = async () => {
 const response = await fetch('/api/branches');
 const data = await response.json();
 if (response.status >= 400) {
  throw new Error(data.errors);
 }
 return data;
};
const fetchPulls = async (state, page) => {
 const response = await fetch(`/api/pulls?state=${state}&page=${page}`);
 const data = await response.json();
 if (response.status >= 400) {
  throw new Error(data.errors);
 }
 return data;
};

export { fetchCommits, fetchBranches, fetchPulls };
