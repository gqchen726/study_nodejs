// const baseUrl = "http://192.168.1.10:8000/mytest";
const baseUrl = "http://localhost:8000/mytest";
const baseUrls = {
    userBaseUrl: `${baseUrl}/user`,
    productBaseUrl: `${baseUrl}/product`,
};
export const urlsUtil = {
    user: {
        loginUrl: `${baseUrls.userBaseUrl}/login`,
        registerUrl: `${baseUrls.userBaseUrl}/create`,
        checkMobileNumber: `${baseUrls.userBaseUrl}checkMobileNumber`,
    },
    product: {
        addUrl: `${baseUrls.productBaseUrl}/create`,
        searchUrl: `${baseUrls.productBaseUrl}/search`,
    },
}