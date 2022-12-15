import app_config from '../../../config/app_config.mjs';
const {SERVICE_TWILIO_ACCOUNT_ID, SERVICE_TWILIO_AUTH, SERVICE_TWILIO_SERVICE_ID} = app_config;
import twilioInit from 'twilio';
const twilio = twilioInit(SERVICE_TWILIO_ACCOUNT_ID, SERVICE_TWILIO_AUTH)
import { sendSuccessResponse, sendFailureResponse } from '../../../utils/response.mjs';

const verifyService = async (data) => {
    try {
        const verification = await twilio.verify
            .services(SERVICE_TWILIO_SERVICE_ID)
            .verifications.create({
                to: `${data.cellNumber}`,
                channel: `${data.channel}`,
            });
        return verification;
    } catch (e) {
        throw e;
    }
};

const verificationCheckService = async (data) => {
    try {
        // @ts-ignore
        const verificationCheck = await twilio.verify
            .services(SERVICE_TWILIO_SERVICE_ID)
            .verificationChecks.create({
                to: `${data.cellNumber}`,
                code: `${data.otp}`,
            });
        return verificationCheck;
    } catch (e) {
        throw e;
    }
};

const generateTwilioOtp = async (request, response) => {
    try {
        const { cellNumber, channel = 'sms' } = request.body;
        const verification = await verifyService({ cellNumber: cellNumber, channel });
        if (verification.status === 'pending') {
            return sendSuccessResponse(response, 200, { status: verification.status }, 'OTP_CREATED');
        }
        // @ts-ignore
        return sendFailureResponse(response, 400, {}, [verification.message]);
    } catch (e) {
        
        console.log('[generateTwilioOtp]', e)
        return sendFailureResponse(response, 500, {}, ['SERVER_ERROR']);
    }
};

const verifyTwilioOtp = async (request, response) => {
    try {
        const { cellNumber, otp } = request.query;

        const verificationCheck = await verificationCheckService({
            cellNumber: process.env.COUNTRY_CODE + cellNumber,
            otp,
        });

        const { status } = verificationCheck;

        if (status === 'approved') {
            // TODO search user
            const user = {};

            if (!user.result) {
                console.log('[twilioVerifyOTP][user][No user found.]');
                return sendFailureResponse(response, 404, {}, ['USER_NOT_EXISTS']);
            }
            user.result.verifications.phone_verified = true;
            await user.result.save();

            //  Sending response in case everything went well!
            return sendSuccessResponse(response, 200, {}, 'CELL_VERIFIED');
        }

        // @ts-ignore
        return sendFailureResponse(response, 404, {}, [verificationCheck.message]);
    } catch (e) {
        return sendFailureResponse(response, 500, {}, ['SERVER_ERROR']);
    }
};

export { generateTwilioOtp, verifyTwilioOtp };