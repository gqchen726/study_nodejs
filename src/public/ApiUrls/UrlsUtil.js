// const baseUrl = "http://192.168.1.8:8000/mytest";
const baseUrl = "http://localhost:8000/mytest";
// const baseUrl = "http://1.15.85.206:8000/mytest";
const baseUrls = {
    userBaseUrl: `${baseUrl}/user`,
    productBaseUrl: `${baseUrl}/product`,
    orderBaseUrl: `${baseUrl}/order`,
};
export const urlsUtil = {
    user: {
        loginUrl: `${baseUrls.userBaseUrl}/login`,
        registerUrl: `${baseUrls.userBaseUrl}/create`,
        checkMobileNumber: `${baseUrls.userBaseUrl}/checkMobileNumber`,
        getCollections: `${baseUrls.userBaseUrl}/getCollections`,
    },
    product: {
        addUrl: `${baseUrls.productBaseUrl}/create`,
        searchUrl: `${baseUrls.productBaseUrl}/search`,
    },
    order: {
        genericOrderUrl: `${baseUrls.orderBaseUrl}/create`,
        searchOrderUrl: `${baseUrls.orderBaseUrl}/search`,
    }
}