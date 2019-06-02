const fetchCommits = async () => {
	const response = await fetch('/api/commits');
	const data = await response.json();
	if (response.status >= 400) {
		throw new Error(data.errors);
	}
	return data.commits.body;
};

const fetchBranches = async () => {
	const response = await fetch('/api/branches');
	const data = await response.json();
	if (response.status >= 400) {
		throw new Error(data.errors);
	}
	console.log(data);
	return data;
};

export { fetchCommits, fetchBranches };

// export function fetchCommits() {
// 	fetch('/api/commits').then(res => {
// 		if (res.ok) {
// 			res.json().then(data => {
// 				return data.commits.body;
// 			});
// 		} else {
// 			throw Error(`Request rejected with status ${res.status}`);
// 		}
// 	});
// }
