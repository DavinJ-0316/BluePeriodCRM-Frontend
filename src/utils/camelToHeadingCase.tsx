const camelToHeadingCase = (input: string) => {
    const addedSpace = input.replace(/([A-Z])/, ' $1');
    const output = addedSpace.charAt(0).toUpperCase() + addedSpace.slice(1);
    return output;
};

export default camelToHeadingCase;
