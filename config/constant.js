const constants = {
    nextFiveMinutes: () => Date.now() + 300000,
    labels: {
        RESPONSES: {
            USER_ALREADY_EXIST: 'User already exist.',
            USER_NOT_EXIST: 'User does not exist.',
            USER_CREATED: 'User created successfully',
            PHONE_VERIFIED: 'Phone number verified',
            OTP_GENERATED: 'OTP generated successfully.',
            OTP_VERIFIED: 'OTP verified successfully.',
            OTP_EXPIRED: 'OTP is expired',
            OTP_NOT_EXIST: 'OTP does not exist.',
            INTERNEL_SERVER_ERROR: 'There is some technical problem on the server. Kindly contact system administrator.',
        }
    }
}

module.exports = constants;