// Checking environment..
var env = process.env.NODE_ENV || 'development';

// Fetch environment config
var config = require('./config.json');
var envConfig = config[env];

// Add environment config values to process environment
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);