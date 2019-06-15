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
const fetchPulls = async () => {
	const response = await fetch('/api/pulls');
	const data = await response.json();
	if (response.status >= 400) {
		throw new Error(data.errors);
	}
	return data.pulls.body;
};

export { fetchCommits, fetchBranches, fetchPulls };
