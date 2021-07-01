async function load_user_profile_page() {
    var userID = sessionStorage.getItem("current_user_id"); // come from getUserToken() in the page before (user_registresion/place_order/header_bar)
    const user_doc = await promiseUserLoaderById(userID); //get the washer from the firebase
    load_profile_header_of_user(user_doc); //function in profile_header.js
    insert_orders_blocks_of_user("in_process_orders", userID, "process"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    insert_orders_blocks_of_user("finished_orders", userID, "finished"); // function in order_blocks_user.js that insert all "finished" into div "finished_orders"
    f_display_user_reviews(userID); // in user_tabs.js
}

