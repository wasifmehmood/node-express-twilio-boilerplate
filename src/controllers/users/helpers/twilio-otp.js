const { SERVICE_TWILIO_ACCOUNT_ID, SERVICE_TWILIO_AUTH, SERVICE_TWILIO_SERVICE_ID } = require('../../../config/app_config.js');
const twilio = require('twilio')(SERVICE_TWILIO_ACCOUNT_ID, SERVICE_TWILIO_AUTH);
const { sendSuccessResponse, sendFailureResponse } = require('../../../utils/response.js');
const { labels: { RESPONSES } } = require('../../../config/constant');
const { USER_NOT_EXIST, OTP_GENERATED, PHONE_VERIFIED, INTERNEL_SERVER_ERROR } = RESPONSES;
const { User } = require('../../../models');

const verifyService = async (data) => {
    try {
        const verification = await twilio.verify
            .services(SERVICE_TWILIO_SERVICE_ID)
            .verifications.create({
                to: `${data.cellNumber}`,
                channel: `${data.channel}`,
            });
        return verification;
    } catch (error) {
        throw error;
    }
};

const verificationCheckService = async (data) => {
    try {
        const verificationCheck = await twilio.verify
            .services(SERVICE_TWILIO_SERVICE_ID)
            .verificationChecks.create({
                to: `${data.cellNumber}`,
                code: `${data.otp}`,
            });
        return verificationCheck;
    } catch (error) {
        throw error;
    }
};

const generateTwilioOtp = async (request, response) => {
    try {
        const { phone_number, channel = 'sms' } = request.body;

        const verification = await verifyService({ cellNumber: phone_number, channel });
        if (verification.status === 'pending') {
            return sendSuccessResponse(response, 200, { status: verification.status }, OTP_GENERATED);
        }
        // @ts-ignore
        return sendFailureResponse(response, 400, {}, [verification.message]);
    } catch (error) {
        return sendFailureResponse(response, 500, {}, [INTERNEL_SERVER_ERROR]);
    }
};

const verifyTwilioOtp = async (request, response) => {
    try {
        const { phone_number: cellNumber, otp } = request.body;

        let user = await User.findOne({
            where: {
                phone_number: cellNumber
            }
        });

        if (!user) {
            console.log('[verifyTwilioOtp][user][No user found.]');
            return sendFailureResponse(response, 404, {}, [USER_NOT_EXIST]);
        }

        const verificationCheck = await verificationCheckService({
            cellNumber,
            otp,
        });

        const { status } = verificationCheck;

        if (status === 'approved' || status === 'pending') {
            // TODO search user

            //  Sending response in case everything went well!
            return sendSuccessResponse(response, 200, {}, PHONE_VERIFIED);
        }

        // @ts-ignore
        return sendFailureResponse(response, 404, {}, [verificationCheck.message]);
    } catch (error) {
        console.log('errr', error)
        return sendFailureResponse(response, 500, {}, [INTERNEL_SERVER_ERROR]);
    }
};

module.exports = { generateTwilioOtp, verifyTwilioOtp };