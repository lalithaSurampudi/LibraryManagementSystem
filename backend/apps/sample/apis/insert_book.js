const { json } = require("express");

const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const driver = require(API_CONSTANTS.DRIVER_PATH);

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        const check_book = await driver.getQuery(
            `SELECT ISBN from Books where ISBN=?`, [jsonReq.ISBN]
        )
        // check weather book is present or not here book is not present we are going the insert the book.
        if (!check_book.length) {
            const check_row = await sqldriver.getQuery(
                `SELECT ISBN from Books where Row_no =${jsonReq.Row_no} and Shelf_no =${jsonReq.Shelf_no}`
            )
            console.log(check_row);
            if (!check_row.length) {
                const insert = await sqldriver.runCmd(
                    `INSERT into Books (Name,ISBN,Category,Edition,Shelf_no,Row_no,Count) VALUES(?,?,?,?,?,?,?)`,
                    [
                        jsonReq.Name,
                        jsonReq.ISBN,
                        jsonReq.Category,
                        jsonReq.Edition,
                        jsonReq.Shelf_no,
                        jsonReq.Row_no,
                        jsonReq.Copies
                    ]
                )
                // book is inserted now insert the name of author in author table .
                if (insert) {
                    const check_author = await sqldriver.getQuery(
                        `SELECT Name from Author where Name = ?`, [jsonReq.Author]
                    )
                    if (!check_author.length) { // here author is not present we add the author first.
                        const insert_author = await sqldriver.runCmd(
                            `INSERT into Author (Name) VALUES(?)`, [jsonReq.Author]
                        )
                        if (insert_author) {
                            const author_id = await sqldriver.getQuery(
                                `SELECT ID FROM Author where Name = ?`, [jsonReq.Author]
                            )
                            const book_id = await sqldriver.getQuery(
                                `SELECT ID FROM Books where ISBN =?`, [jsonReq.ISBN]
                            )
                            console.log(author_id);
                            console.log(author_id[0].ID);
                            if (author_id.length && book_id.length) {
                                const book_author = await sqldriver.runCmd(
                                    `INSERT into Book_author(Book_id,Author_id) VALUES (?,?)`, [author_id[0].ID, book_id[0].ID]
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
                        else {
                            return {
                                result: false,
                                success: false,
                                message: `author name already present`
                            };

                        }
                    }
                    else // auhtor is already present in table and we update the book_author table with this condition
                    {
                        const author_id = await sqldriver.getQuery(
                            `SELECT ID FROM Author where Name = ?`, [jsonReq.Author]
                        )
                        const book_id = await sqldriver.getQuery(
                            `SELECT ID FROM Books where ISBN =?`, [jsonReq.ISBN]
                        )
                        console.log(author_id);
                        console.log(author_id[0].ID);
                        if (author_id.length && book_id.length) {
                            const book_author = await sqldriver.runCmd(
                                `INSERT into Book_author(Book_id,Author_id) VALUES (?,?)`, [author_id[0].ID, book_id[0].ID]
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
        // book is present we simply increase the count.. 
        else {
            const count = await sqldriver.getQuery(
                `SELECT Count from Books where ISBN=?`, [jsonReq.ISBN]
            )
            if (count) {
                const update_count = await sqldriver.runCmd(
                    `UPDATE Books SET Count =${count[0].Count + jsonReq.Copies} WHERE ISBN =  ${jsonReq.ISBN} ;
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
            error: API_CONSTANTS.API_RESPONSE_SERVER_ERROR,
        };
    }

}

const validateRequest = (jsonReq) => jsonReq.Name && jsonReq.ISBN && jsonReq.Category && jsonReq.Shelf_no && jsonReq.Row_no && jsonReq.Author;