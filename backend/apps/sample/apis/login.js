const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const driver = require(API_CONSTANTS.DRIVER_PATH);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.doService = async (jsonReq) => {
    if (!validateRequest(jsonReq)) return "Insufficient parameters";
    try {
        const check = await driver.getQuery(
            `SELECT Password FROM User where Email = ?`,[jsonReq.Email]
        );
        console.log(check[0]);
        console.log(jsonReq.Password);
        if (check) {
            let isValidPassword = bcrypt.compareSync(jsonReq.Password, check[0].Password);
            if (isValidPassword) {
                const token = jwt.sign(
                    { user_id: jsonReq.Email },
                    "lalitha",
                    {
                        expiresIn: "2h",
                    }
                );
                console.log(token);
                return {
                    result: true,
                    success: true,
                    message: `${token}`
                };
            }
            else
            {
                return {
                    result: false,
                    success: false,
                    message: `incorrect password`
                };
            }
        }
        return {
            result: false,
            success: false,
            message: `login failed`
        };
    } catch (error) {
        return "Error";
    }
}

const validateRequest = (jsonReq) => jsonReq;