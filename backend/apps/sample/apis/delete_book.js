const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const driver = require(API_CONSTANTS.DRIVER_PATH);

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    const isbn = await driver.getQuery(
        `SELECT availability from Books where ISBN =?`, [jsonReq.ISBN]
    )
    console.log(JSON.stringify(isbn))
    if (isbn.length == 0) {
        return {
            result: true,
            success: true,
            message: `no book of this isbn is present `
        };
    }
    else if (isbn[0].Count > 1) {
        const count = await driver.runCmd(
            `UPDATE Books SET availability =${isbn[0].Count - 1} WHERE ISBN =  ${jsonReq.ISBN} ;`
        )
        if(count)
        {
            return {
                result: true,
                success: true,
                message: `Deletion successful`
            };   
        }
    }
    else {
        const del = await driver.runCmd(
            `DELETE from Books where ISBN = ?`, [jsonReq.ISBN]
        )
        if (del) {
            return {
                result: true,
                success: true,
                message: `Deletion successful`
            };
        }
    }
}

const validateRequest = (jsonReq) => jsonReq;