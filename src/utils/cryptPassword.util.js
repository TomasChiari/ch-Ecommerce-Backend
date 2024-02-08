import bcrypt from "bcrypt";

export const createHash = (pass) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(pass, salt);
};

export const validatePassword = (passwordHashed, password) => {
	return bcrypt.compareSync(password, passwordHashed);
};
