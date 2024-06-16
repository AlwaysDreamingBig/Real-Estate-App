export const verifyPassword = (password) => {
    const minLength = 8;

    // Regular expressions to check for uppercase, lowercase, and number
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    // Check for minimum length
    if (password.length < minLength) {
        return false;
    }

    // Check for presence of uppercase, lowercase, and number
    if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !numberRegex.test(password)) {
        return false;
    }

    // If all conditions pass, return true
    return true;
}

export const generateRandomPassword = (length ) => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const allChars = uppercaseChars + lowercaseChars + numberChars;

    let password = '';

    // Ensure the password contains at least one uppercase letter, one lowercase letter, and one number
    password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));

    // Generate the remaining characters randomly
    for (let i = 3; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Shuffle the password to ensure random order
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}