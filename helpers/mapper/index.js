// User Mapper
export const userMapper = async(userprops) => {
    // Remove password OTP
    let { password, otp, fullName, ...rest } = userprops._doc;
    return rest;
};
