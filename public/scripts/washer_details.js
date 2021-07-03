async function load_washer_profile_page() {
    // let washerID = await getUserToken();
    washerID = sessionStorage.getItem("signed_in_washer");
    console.log("washer id is : ", washerID)
    const washer_doc = await promiseWasherLoaderById(washerID); //get the washer from the firebase
    if (!washer_doc) {
        window.location.href = "../html/washer_flow/washer_registration.html";
        // move to washer register
        return;
    }
    load_profile_header_of_washer(washer_doc); //function in profile_header.js
    
    insert_orders_blocks_of_washer("in_process_orders", washerID, "processing"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    insert_orders_blocks_of_washer("finished_orders", washerID, "finished");   // function in order_blocks_user.js that insert all "finished" into div "finished_orders" 
    
    f_display_washer_details(washer_doc); // in washer_tabs.js
    f_display_washer_reviews(washerID); // in washer_tabs.js
    get_washer_working_hours(washer_doc) // in working_hours_table.js.

}