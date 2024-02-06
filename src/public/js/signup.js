const form = document.getElementById("signupForm");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(form);

	const newUser = {};
	data.forEach((value, key) => (newUser[key] = value));

	console.log(newUser);

	const url = "/api/users";
	const headers = {
		"Content-type": "application/json",
	};
	const method = "POST";
	body = JSON.stringify(newUser);

	fetch(url, { headers, method, body })
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err = console.log(err)));
});
