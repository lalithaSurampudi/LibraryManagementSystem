/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const deletion = async () => {
    let jsonReq = {}
    jsonReq.ISBN = app_delbook.shadowRoot.querySelector("#isbn").value;

    console.log(jsonReq);
    let resp = await apiman.rest(APP_CONSTANTS.API_DELBOOK, "POST", jsonReq, false, true);
    console.log(resp);
    if (!resp || !resp.result)
        alert("something went wrong");
    else {
        alert(resp.message)
    }
}

const goback = async () => {
    document.getElementsByTagName('app-delbook')[0].style.display = "none";
    document.getElementsByTagName('app-detail')[0].style.display = "block";
}

function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-delbook", `${APP_CONSTANTS.APP_PATH}/components/app-delbook/app-delbook.html`, app_delbook);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_delbook = { trueWebComponentMode, register, deletion, goback }