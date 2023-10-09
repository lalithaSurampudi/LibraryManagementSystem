const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const driver = require(API_CONSTANTS.DRIVER_PATH);

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return "Insufficient parameters";

    try {
        const check_book = await driver.getQuery(
            `SELECT ISBN from Books where ISBN=?`, [jsonReq.ISBN]
        )
        if (!check_book.length) {
            const check_row = await driver.getQuery(
                `SELECT ISBN from Books where row_no =${jsonReq.row_no} and column_no =${jsonReq.column_no}`
            )
            if (!check_row.length) {
                const insert = await driver.runCmd(
                    `INSERT into Books(name,ISBN,price, row_no, colum_no,availability) VALUES(?,?,?,?,?,?)`,
                    [
                        jsonReq.name,
                        jsonReq.ISBN,
                        jsonReq.price,
                        jsonReq.row_no,
                        jsonReq.column_no,
                        jsonReq.availability
                    ]
                )
                if (insert) {
                    const check_author = await driver.getQuery(
                        `SELECT Name from Author where name = ?`, [jsonReq.Author]
                    )
                    if (!check_author.length) { 
                        const insert_author = await driver.runCmd(
                            `INSERT into Author (name) VALUES(?)`, [jsonReq.Author]
                        )
                        if (insert_author) {
                            const author_id = await driver.getQuery(
                                `SELECT ID FROM Author where name = ?`, [jsonReq.Author]
                            )
                            const book_id = await driver.getQuery(
                                `SELECT ID FROM Books where ISBN =?`, [jsonReq.ISBN]
                            )
                            console.log(author_id);
                            console.log(author_id[0].ID);
                            if (author_id.length && book_id.length) {
                                const book_details = await driver.runCmd(
                                    `INSERT into Book_Details(book_id,author_id) VALUES (?,?)`, [author_id[0].ID, book_id[0].ID]
                                )
                                if (book_details) {
                                    return {
                                        result: true,
                                        success: true,
                                        message: `author_book table updated `
                                    };
                                }
                                else {
                                    return {
                                        result: false,
                                        success: false,
                                        message: `error in last table query `
                                    };
                                }
                            }
                        }
                        else {
                            return {
                                result: false,
                                success: false,
                                message: `author name already present`
                            };

                        }
                    }
                    else
                    {
                        const author_id = await driver.getQuery(
                            `SELECT ID FROM Author where name = ?`, [jsonReq.Author]
                        )
                        const book_id = await driver.getQuery(
                            `SELECT ID FROM Books where ISBN =?`, [jsonReq.ISBN]
                        )
                        console.log(author_id);
                        console.log(author_id[0].ID);
                        if (author_id.length && book_id.length) {
                            const book_author = await driver.runCmd(
                                `INSERT into Author(book_id,author_id) VALUES (?,?)`, [author_id[0].ID, book_id[0].ID]
                            )
                            if (book_author) {
                                return {
                                    result: true,
                                    success: true,
                                    message: `author_book table updated `
                                };
                            }
                            else {
                                return {
                                    result: false,
                                    success: false,
                                    message: `error in last table query `
                                };
                            }
                        }
                    }
                }
            }
            else {
                return {
                    result: false,
                    success: false,
                    message: `place is already occupied`
                };
            }
        } 
        else {
            const count = await driver.getQuery(
                `SELECT availability from Books where ISBN=?`, [jsonReq.ISBN]
            )
            if (count) {
                const update_count = await driver.runCmd(
                    `UPDATE Books SET availability =${count[0].availability + jsonReq.Copies} WHERE ISBN =  ${jsonReq.ISBN} ;
                `
                )
                if (update_count) {
                    return {
                        result: true,
                        success: true,
                        message: `count updated`
                    };
                }
                else {
                    return {
                        result: false,
                        success: false,
                        message: `error in inreasing count`
                    };
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        return {
            result: false,
            success: false,
            message: 'Api error',
            error: "server error",
        };
    }

}

const validateRequest = (jsonReq) => jsonReq.Name && jsonReq.ISBN && jsonReq.Category && jsonReq.Shelf_no && jsonReq.Row_no && jsonReq.Author;