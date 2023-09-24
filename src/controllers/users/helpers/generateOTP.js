const otpGenerator = require('otp-generator');
const { sendSuccessResponse, sendFailureResponse } = require('../../../utils/response');
const { nextFiveMinutes, labels: { RESPONSES } } = require('../../../config/constant');

const { USER_NOT_EXIST, OTP_GENERATED, INTERNEL_SERVER_ERROR } = RESPONSES;
const { User } = require('../../../models');

const generateOTP = async (req, res, next) => {
  const { phone_number } = req.body;

  try {
    // Generate otp
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // If user exist update the record with generated otp and expiration date.
    const [id] = await User.update({ otp, otp_expiration_date: nextFiveMinutes() }, {
      where: {
        phone_number,
      },
    });

    // If user does not exist send failure response.
    if (!id) {
      return sendFailureResponse(res, 404, {}, [USER_NOT_EXIST]);
    }

    // If everything went well send success response with user id.
    return sendSuccessResponse(res, 201, { id }, OTP_GENERATED);
  } catch (error) {
    console.log('[controllers][users][generateOTP]', error);
    return sendFailureResponse(res, 500, {}, [INTERNEL_SERVER_ERROR]);
  }
};

module.exports = generateOTP;
