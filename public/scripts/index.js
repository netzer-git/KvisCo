const test_rating = async () => {
    let id = [  
        '1LhDqVKzSkZdsnSC6wFrVG5jte93',
        '2sQCBAeBQvdyAa18LDbOYOwHuOH2',
        // '59k1DZDLkmSnQqAwMu4hDxNJUhU2',
        // 'JaLY3KeIsSO8kSUr3Ks6kiJXkQ92',
        // 'VxbGFBQzipZf1rzyAAvr8uMp8nl1',
        // 'c0KmkCafo7bZmCcZvW2Nr7NqgDK2',
        // 'oLIW1OSO4RPX04nVJpRfe9FGsrd2',
        'c0KmkCafo7bZmCcZvW2Nr7NqgDK2',
        '5IMy2kMSbheOriFPxqKmKTNWOJ92'
            ];
    // orderArray = await promiseOrderArrayByUserIdAndStatus(id[0], 'processing');
    // for (o of orderArray) {
    //     console.log(o.data().created_at.seconds)
    // }
    // console.log("******** sort ********")
    // orderArray = sortOrdersByCreatedAt(orderArray);
    // for (o of orderArray) {
    //     console.log(o.data().created_at.seconds)
    // }
    let washer1 = await promiseWasherLoaderById(id[0]);
    let washer2 = await promiseWasherLoaderById(id[1]);
    let washer3 = await promiseWasherLoaderById(id[2]);
    let washer4 = await promiseWasherLoaderById(id[3]);
    currentPoint = {
        lat: 31.773610027001155,
        lng: 35.235351837826255
    }
    let arr = await sortWashersByDistance([washer1, washer2, washer3, washer4], currentPoint);
    for (w of arr) {
        console.log(w.data().name);
    }
}