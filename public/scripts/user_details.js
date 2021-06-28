async function load_user_profile_page() {
    if (!isUserSignedIn()) {
        await signIn();
        return;
    }
    var userID = sessionStorage.getItem("current_user_id"); // TO FIX - suppose to come from getUserToken() in the page before (user_registresion/new_order/header)
    const user_doc = await promiseUserLoaderById(userID); //get the washer from the firebase
    if (!user_doc) {
        window.location.href = "../html/user_flow/user_registration.html"; 
        return;
    }
    const all_orders = await promiseOrderArrayByUserIdAndStatus(userID, "finished"); //get all the people that reviewed this washer from orders
    load_profile_header_of_user(user_doc); //function in profile_header.js
    insert_orders_blocks_of_user("in_process_orders", userID, "process"); // function in order_blocks_user.js that insert all "pending+process" into div "in_process_orders"
    insert_orders_blocks_of_user("finished_orders", userID, "finished"); // function in order_blocks_user.js that insert all "finished" into div "finished_orders"
    f_display_user_reviews(all_orders); // in user_tabs.js
}

