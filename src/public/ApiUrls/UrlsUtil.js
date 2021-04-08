const baseUrl = "http://192.168.1.8:8000/mytest";
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
    },
    product: {
        addUrl: `${baseUrls.productBaseUrl}/create`,
        searchUrl: `${baseUrls.productBaseUrl}/search`,
        searchProductNameList: `${baseUrls.productBaseUrl}/searchSimpleProduct`,
        searchProductCategoryList: `${baseUrls.productBaseUrl}/getAllCategory`,
        removeUrl: `${baseUrls.productBaseUrl}/delete`,
        updateUrl: `${baseUrls.productBaseUrl}/update`,
    },
    order: {
        genericOrderUrl: `${baseUrls.orderBaseUrl}/create`,
        searchOrderUrl: `${baseUrls.orderBaseUrl}/listAllOrder`,
    },
    image: {
        upload: `${baseUrls.image}/upload`,
        get: `${baseUrls.image}/get`,
    }
}