var config = {
	"mongo_chat-db": {
		username: 'test',
		password: 'try',
		hosts: 'localhost',
		replicaSet: 'fu_test',
		database: 'fu-test-db'
	},
	"messageDb": 'chat-db',
	"AUTH_BASE_URL": "http://localhost:4000",
    SENTRY_DSN: 'https://c6aba19a021e4c439510f8370770b92c@sentry.io/1869747'
};

module.exports = config;