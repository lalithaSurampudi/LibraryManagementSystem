/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
const FRONTEND = "http://localhost:8080";
const BACKEND = "http://localhost:9090";
const APP_NAME = "LMS";
const APP_PATH = `${FRONTEND}/apps/${APP_NAME}`;

export const APP_CONSTANTS = {
    FRONTEND, BACKEND, APP_PATH, APP_NAME,
    SIGNUP_HTML: APP_PATH + "/signup.html",
    LOGIN_HTML: APP_PATH + "/login.html",
    DETAIL_HTML: APP_PATH + "/detail.html",
    ADDBOOK_HTML: APP_PATH + "/addbook.html",
    DELBOOK_HTML: APP_PATH + "/delbook.html",


    SESSION_NOTE_ID: "com_monkshu_ts",

    API_SIGNUP: `${BACKEND}/apis/signup`,
    API_LOGIN: `${BACKEND}/apis/login`,
    API_DETAIL: `${BACKEND}/apis/get_book`,
    API_ADDBOOK: `${BACKEND}/apis/insert_book`,
    API_DELBOOK: `${BACKEND}/apis/delete_book`, 
    API_TRANSACTION: `${BACKEND}/apis/transactions`,
 


    USERID: "id",
    USER_ROLE: "user",
    GUEST_ROLE: "guest",
    PERMISSIONS_MAP: {
        user: [],
        guest: [APP_PATH + "/login.html",APP_PATH + "/signup.html",APP_PATH + "/detail.html", $$.MONKSHU_CONSTANTS.ERROR_THTML]
    },
    API_KEYS: { "*": "uiTmv5YBOZMqdTb0gekD40PnoxtB9Q0k" },
    KEY_HEADER: "X-API-Key"
}
