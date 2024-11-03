export const cookieOptions = { httpOnly: true, secure: true };

export const regExpressions = {
    passwordRegExp: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
    pinNumber:/^\d{6}$/,
}
