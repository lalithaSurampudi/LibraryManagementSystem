const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const driver = require(API_CONSTANTS.DRIVER_PATH);

exports.doService = async (jsonReq) => {
    const show = await driver.getQuery(
        `SELECT * From Books`
    )
    if(show.length)
    {
        return {
            result: true,
            success: true,
            message: show
        };  
    }
    else
    {
        return {
            result: true,
            success: true,
            message: `NO book present in database `
        };  
    }
}
