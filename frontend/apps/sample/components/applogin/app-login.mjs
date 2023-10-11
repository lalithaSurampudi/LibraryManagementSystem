/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const logged = async () => {
    
    let jsonReq = {}
    jsonReq.Email = app_login.shadowRoot.querySelector("#email").value;
    jsonReq.Password = app_login.shadowRoot.querySelector("#password").value;

    console.log(jsonReq);
    let resp = await apiman.rest(APP_CONSTANTS.API_LOGIN, "POST", jsonReq , false, true);
    console.log(resp.message);
    if (!resp || !resp.result) 
    alert("something went wrong");
    else 
    {
        document.cookie = `TOKEN = ${resp.message}`;
        alert("succesfull ")
        router.loadPage(APP_CONSTANTS.DETAIL_HTML);
    }
}
const signing = async() => {
    document.getElementsByTagName('app-login')[0].style.display = "none";
    document.getElementsByTagName('app-signup')[0].style.display = "block";
}

function register() {
    monkshu_component.register("app-login", `${APP_CONSTANTS.APP_PATH}/components/app-login/app-login.html`, app_login);
}

const trueWebComponentMode = true;	

export const app_login = { trueWebComponentMode, register, signing ,logged }
