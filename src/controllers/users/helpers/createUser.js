const { sendSuccessResponse, sendFailureResponse } = require('../../../utils/response');
const { labels: { RESPONSES } } = require('../../../config/constant');
const { USER_ALREADY_EXIST, USER_CREATED, INTERNEL_SERVER_ERROR } = RESPONSES;
const { User } = require('../../../models');

const createUser = async (req, res, next) => {
  const { name, phone_number } = req.body;

  try {

    // Create user record if not exist.
    let [user, created] = await User.findOrCreate({
      where: { phone_number },
      defaults: {
        name,
        phone_number
      }
    });

    // If user already exist send failure response.
    if (!created) {
      return sendFailureResponse(res, 409, {}, [USER_ALREADY_EXIST]);
    }
    
    // Creating user record.
    await User.create({
      name,
      phone_number
    });
    
    // If everything went well send success response.
    return sendSuccessResponse(res, 201, {}, USER_CREATED);

  } catch (error) {
    console.log('[controllers][users][createUser]', error);
    return sendFailureResponse(res, 500, {}, [INTERNEL_SERVER_ERROR]);
  }
}

module.exports = createUser