module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
	},
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	testPathIgnorePatterns: ['/node_modules/'],
	moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
