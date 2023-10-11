/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const insert = async () => {
    let jsonReq = {}
    jsonReq.Name = app_addbook.shadowRoot.querySelector("#name").value;
    jsonReq.ISBN = app_addbook.shadowRoot.querySelector("#isbn").value;
    jsonReq.Category = app_addbook.shadowRoot.querySelector("#category").value;
    jsonReq.Edition = app_addbook.shadowRoot.querySelector("#edition").value;
    jsonReq.Shelf_no = app_addbook.shadowRoot.querySelector("#shelf").value;
    jsonReq.Row_no = app_addbook.shadowRoot.querySelector("#row").value;
    jsonReq.Copies = app_addbook.shadowRoot.querySelector("#copies").value;
    jsonReq.Author = app_addbook.shadowRoot.querySelector("#author").value;

    console.log(jsonReq);
    let resp = await apiman.rest(APP_CONSTANTS.API_ADDBOOK, "POST", jsonReq , false, true);
    console.log(resp);
    if (!resp || !resp.result) 
    alert("something went wrong",resp.message);
    else 
    {
        alert(resp.message)
    }
   
}
const goback = async () => {
    document.getElementsByTagName('app-addbook')[0].style.display = "none";
    document.getElementsByTagName('app-detail')[0].style.display = "block";
}

function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-addbook", `${APP_CONSTANTS.APP_PATH}/components/app-addbook/app-addbook.html`, app_addbook);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_addbook = { trueWebComponentMode, register, insert, goback}