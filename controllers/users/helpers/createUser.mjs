import { sendSuccessResponse, sendFailureResponse } from "../../../utils/response.mjs";

const createUser = async (req, res, next) => {
    const {name, phone_number} = req.body;
    const result = await createUser(req.body); //////////////////////////// TODO
    const { status, msg, error } = result;
    if (status === 201) {
      return sendSuccessResponse(res, 201, {}, msg);
    }
    if (status === 409) {
      return sendFailureResponse(res, 409, {}, msg);
    }
  
    if (status === 500) {
    //   logger.error('[InsertUser][ERROR]', msg);
      return sendFailureResponse(res, 500, {}, msg);
    }
  
    return sendFailureResponse(res, status, {}, msg);
}

export { createUser }