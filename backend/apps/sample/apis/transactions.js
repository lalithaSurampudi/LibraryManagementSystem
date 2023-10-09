const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const driver = require(API_CONSTANTS.DRIVER_PATH);
const jwt = require("jsonwebtoken");

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return "Insufficient parameters";
    try {
        // decode token and get the mail;
        const token = jsonReq.TOKEN;
        const decoded = jwt.verify(token, "lalitha");
        var user_mail = decoded.user_id;
        const id = await sqldriver.getQuery(
            `SELECT ID from User where Email = ?`, [user_mail]
        )
        if (id.length >= 1) {
            if (jsonReq.type == "borrow") {
                const insert = await sqldriver.runCmd(
                    `INSERT into Transactions(user_id, book_id, status,timestamp) VALUES (?,?,?,?)`, [
                    id[0].ID,
                    jsonReq.user_id,
                    "Borrow",
                    jsonReq.Date
                ]
                )
                if (insert) {
                    const book_count = await sqldriver.getQuery(
                        `SELECT Count from Books where ID =?`, [jsonReq.book_id]
                    )
                    if (book_count[0].Count >= 1) {
                        const update = await driver.runCmd(
                            `UPDATE Books set Count = ${book_count[0].Count - 1} where ID = ${jsonReq.book_id}`
                        )
                        if (update) {
                            return {
                                result: true,
                                success: true,
                                message: `Borrow succesfull and count updated `
                            };
                        }
                        else {
                            return {
                                result: true,
                                success: true,
                                message: `book count is not updated `
                            };
                        }

                    }
                    else {
                        return {
                            result: true,
                            success: true,
                            message: `book count is not enough`
                        };
                    }
                }
                else {
                    return {
                        result: true,
                        success: true,
                        message: `transaction failed `
                    };

                }
            }

            else if (jsonReq.type == "return") {
                const insert = await sqldriver.runCmd(
                    `INSERT into Transactions(user_id, book_id, status,timestamp) VALUES (?,?,?,?)`, [
                    jsonReq.Book_id,
                    id[0].ID,
                    jsonReq.Date,
                    "return"
                ]
                )
                if (insert) {
                    const book_count = await sqldriver.getQuery(
                        `SELECT Count from Books where ID =?`, [jsonReq.book_id]
                    )
                    if (book_count[0].Count >= 0) {
                        const update = await sqldriver.runCmd(
                            `UPDATE Books set Count = ${book_count[0].Count + 1} where ID = ${jsonReq.ook_id}`
                        )
                        if (update) {
                            return {
                                result: true,
                                success: true,
                                message: `return succesfull and count also updated `
                            };
                        }
                        else {
                            return {
                                result: true,
                                success: true,
                                message: `book count is not updated `
                            };
                        }

                    }
                    else {
                        return {
                            result: true,
                            success: true,
                            message: `error in getting the count of books`
                        };
                    }
                }
                else {
                    return {
                        result: true,
                        success: true,
                        message: `transaction failed `
                    };

                }

            }
        }
        else
        {
            return {
                result: true,
                success: true,
                message: `error in getting id from token `
            };   
        }
    } catch (error) {
        console.error("hii" + error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const validateRequest = (jsonReq) => jsonReq;