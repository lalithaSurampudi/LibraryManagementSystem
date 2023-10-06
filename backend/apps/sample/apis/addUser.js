const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const driver = require(API_CONSTANTS.DRIVER_PATH);
exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        const insertTask = await driver.runCmd(
            `Insert into Users(first_name, last_name,email,password,role) VALUES (?,?,?,?,?)`,
            [
              jsonReq.first_name,
              jsonReq.last_name,
              jsonReq.email,
              jsonReq.password,
              jsonReq.role
            ]
          );
        if(insertTask)
        return {
          result: true,
          success: true,
          message: `data inserted successfully`,
        };
      } catch (error) {
        console.error(error);
        return {
          result: false,
          success: false,
          message: 'API error',
          error: API_CONSTANTS.API_RESPONSE_SERVER_ERROR,
        };
      }
}


const validateRequest = (jsonReq) => jsonReq;
