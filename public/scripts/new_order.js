


function display_new_order(washerID) {

}


async function load_new_order_of_user(orderID) {
    const user_doc = await promiseUserLoaderById(userID);
    console.log(user_doc.data().name)
    show_profile_header("profile_header",user_doc);
}

