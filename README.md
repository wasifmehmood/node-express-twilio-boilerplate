# node-express-twilio-boilerplate
Node OTP Generator with Twilio

## Project Structure

```
src
├── app.js
├── config
│   ├── app_config.js
│   ├── config.json
│   └── constant.js
├── controllers
│   └── users
│       ├── helpers
│       │   ├── createUser.js
│       │   ├── generateOTP.js
│       │   ├── twilio-otp.js
│       │   └── verifyOTP.js
│       ├── index.js
│       └── validations
│           └── index.js
├── middlewares
│   └── validationResult.js
├── migrations
│   └── 20221215062046-create-user.js
├── models
│   ├── index.js
│   └── user.js
├── public
│   └── index.html
├── routes
│   ├── index.js
│   └── user.route.js
└── utils
    ├── database.js
    ├── response.js
    └── time-utils.js
```

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

Inspirations
- [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)

