const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const driver = require(API_CONSTANTS.DRIVER_PATH);
exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq.Tablename)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        driver.runCmd(
          `CREATE TABLE ${jsonReq.Tablename} (id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            role INTEGER NOT NULL)`
        );
        return {
          result: true,
          success: true,
          message: `Table:${jsonReq.Tablename}, created successfully`,
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
