const baseUrl = "http://192.168.1.11:8000/mytest";
// const baseUrl = "http://localhost:8000/mytest";
// const baseUrl = "http://1.15.85.206:8000/mytest";
const baseUrls = {
    userBaseUrl: `${baseUrl}/user`,
    productBaseUrl: `${baseUrl}/product`,
    orderBaseUrl: `${baseUrl}/order`,
    image: `${baseUrl}/image`,
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
    },
    order: {
        genericOrderUrl: `${baseUrls.orderBaseUrl}/create`,
        searchOrderUrl: `${baseUrls.orderBaseUrl}/listAllOrder`,
        getOrderUrl: `${baseUrls.orderBaseUrl}/getOrderById`,
        updateOrderStatus: `${baseUrls.orderBaseUrl}/update`,
    },
    image: {
        upload: `${baseUrls.image}/upload`,
        get: `${baseUrls.image}/get`,
    }
}