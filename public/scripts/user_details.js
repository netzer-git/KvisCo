async function load_user_profile_page() {
    if (!isUserSignedIn()) {
        await signIn();
        return;
    }
    var userID = sessionStorage.getItem("user_id");
    const user_doc = await promiseUserLoaderById(userID); //get the washer from the firebase
    if (!user_doc) {
        window.location.href = "../html/user_flow/map-filter.html";
        return;
    }
    const all_orders = await promiseOrderArrayByUserIdAndStatus(userID, "finished"); //get all the people that reviewed this washer from orders
    load_profile_header_of_user(user_doc); //function in profile_header.js
    load_order_blocks_of_user(userID); // function in order_blocks_user.js that have 2 function of washer blocks - for "in_process" and "finished"
    f_display_user_reviews(all_orders); // in washer_tabs.js
}

