import { Coach } from '../../models/index.js';

const findUserByField = async (field) => {
	const query = Coach.findOne(field);
	return query
}

 const addCoach = async (payload = {}, role) => {
    // payload.role = role;
    let user = new Coach(payload);
    return user.save();
};


// export const addUser = async (payload = {}) => USER.create(payload);

// const updateUser = async (email, update = {}) => USER.update(update, { where: { email } });

export { findUserByField, addCoach };
