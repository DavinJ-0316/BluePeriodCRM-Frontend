const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^_&*])[a-zA-Z0-9!@#$%^_&*]{8,32}$/;

    const passwordValidataResult = passwordRegex.test(password);
    return passwordValidataResult;
};

const validateEmail = (email: string): boolean => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailValidateResult = emailRegex.test(email);
    return emailValidateResult;
};

const validateNumber = (code: string): boolean => {
    const numberRegex = /^[0-9]/;

    const numberValidateResult = numberRegex.test(code);
    return numberValidateResult;
};

const validatePhone = (phone: string): boolean => {
    const numberRegex = /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){7,9}$/;

    const numberValidateResult = numberRegex.test(phone);
    return numberValidateResult;
};

export { validatePassword, validateEmail, validateNumber, validatePhone };
