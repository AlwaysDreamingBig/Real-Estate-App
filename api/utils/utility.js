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