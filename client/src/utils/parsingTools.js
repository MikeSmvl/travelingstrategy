const removeQuotes = (aString) => {
	aString.replace(/(^")|("$)/g, '');
};

export default removeQuotes;
