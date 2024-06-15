export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;

    return error;
};

export const extractErrorMessage = (errorString) => {
    try {
        // Find the start of the JSON part
        const jsonPartStart = errorString.indexOf('{');
        if (jsonPartStart === -1) {
            throw new Error("JSON part not found in the error string");
        }
        

        // Extract the JSON part of the string
        const jsonString = errorString.substring(jsonPartStart);

        // Parse the JSON string into an object
        const errorObj = JSON.parse(jsonString);

        // Check if the message field exists
        if (errorObj.message) {
            const message = errorObj.message;
            
            // Check for specific error patterns
            if (message.includes('E11000 duplicate key error') && message.includes('username')) {
                return 'This Username is already used!';
            } else if (message.includes('E11000 duplicate key error') && message.includes('email')) {
                return 'This Email is already used!';
            } else {
                return message;  // Return the original message if no specific pattern matches
            }
        } else {
            throw new Error("Message field not found in the JSON object");
        }
    } catch (error) {
        // Handle any parsing errors or missing message field
        return `Error extracting message: ${error.message}`;
    }
}