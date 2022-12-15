const dateToMilliseconds = require('../../../utils/time-utils');
const { sendSuccessResponse, sendFailureResponse } = require('../../../utils/response');
const { labels: { RESPONSES } } = require('../../../config/constant');
const { USER_NOT_EXIST, OTP_NOT_EXIST, OTP_EXPIRED, OTP_VERIFIED, INTERNEL_SERVER_ERROR } = RESPONSES;
const { User } = require('../../../models');

const verifyOTP = async (req, res) => {
    const { user_id: id } = req.params;
    const { otp } = req.query;

    try {
        // Find user with the specified id.
        let user = await User.findOne({
            where: {
                id,
                otp
            }
        });

        // If user does not exist send failure response.
        if (!user) {
            return sendFailureResponse(res, 404, {}, [USER_NOT_EXIST]);
        }

        user = user.toJSON();
        
        // Check if otp is expired
        if(Date.now() > dateToMilliseconds(user.otp_expiration_date)) {
            return sendFailureResponse(res, 400, {}, [OTP_EXPIRED]);
        }

        // If everything went well send success response.
        return sendSuccessResponse(res, 200, user, OTP_VERIFIED);

    } catch (error) {
        console.log('[controllers][users][verifyOTP]', error);
        return sendFailureResponse(res, 500, {}, [INTERNEL_SERVER_ERROR]);
    }
}

module.exports = verifyOTP