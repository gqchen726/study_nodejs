// const baseUrl = "http://192.168.1.6:8000/mytest";
// const baseUrl = "http://192.168.1.8:8000/mytest";
// const baseUrl = "http://localhost:8000/";
const baseUrl = "https://server-travel-gqchen.herokuapp.com";
// const baseUrl = "http://1.15.85.206:8000/mytest";
const baseUrls = {
    userBaseUrl: `${baseUrl}/user`,
    productBaseUrl: `${baseUrl}/product`,
    orderBaseUrl: `${baseUrl}/order`,
    image: `${baseUrl}/image`,
    collection: `${baseUrl}/collection`
};
export const urlsUtil = {
    user: {
        loginUrl: `${baseUrls.userBaseUrl}/login`,
        registerUrl: `${baseUrls.userBaseUrl}/create`,
        updatePersonInfo: `${baseUrls.userBaseUrl}/update`,
        checkMobileNumber: `${baseUrls.userBaseUrl}/checkMobileNumber`,
        getCollections: `${baseUrls.userBaseUrl}/getCollections`,
        changePassword: `${baseUrls.userBaseUrl}/changePassword`,
        getCheckCode: `${baseUrls.userBaseUrl}/sendEmail`,
    },
    product: {
        addUrl: `${baseUrls.productBaseUrl}/create`,
        searchUrl: `${baseUrls.productBaseUrl}/search`,
        searchFromCode: `${baseUrls.productBaseUrl}/getProductById`,
        searchProductNameList: `${baseUrls.productBaseUrl}/searchSimpleProduct`,
        searchProductCategoryList: `${baseUrls.productBaseUrl}/getAllCategory`,
        removeUrl: `${baseUrls.productBaseUrl}/delete`,
        updateUrl: `${baseUrls.productBaseUrl}/update`,
        checkProductCode: `${baseUrls.productBaseUrl}/checkProduct`,
    },
    order: {
        genericOrderUrl: `${baseUrls.orderBaseUrl}/create`,
        getMyOrders: `${baseUrls.orderBaseUrl}/listAllOrder`,
        getOrderUrl: `${baseUrls.orderBaseUrl}/getOrderById`,
        allOrderList: `${baseUrls.orderBaseUrl}/allOrderList`,
        updateOrderStatus: `${baseUrls.orderBaseUrl}/update`,
    },
    image: {
        upload: `${baseUrls.image}/upload`,
        get: `${baseUrls.image}/get`,
    },
    collection: {
        addCollection: `${baseUrls.collection}/addCollection`,
        deleteCollection: `${baseUrls.collection}/deleteCollection`,
        getAllCollection: `${baseUrls.collection}/listOfCollection`,
    }
}