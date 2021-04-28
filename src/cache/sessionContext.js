
const sessionStorage = window.localStorage;
const sessionContext = {
    put: (key,value) => {
        if(!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key,JSON.stringify(value));
        }
    },
    set: (key,value,outOfDate) => {
        value.outOfDate = outOfDate;
        if(!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key,JSON.stringify(value));
        }
    },
    get: (key) => {
        if(sessionStorage.getItem(key)) {
            let value = localStorage.getItem(key);
            console.log(value)
            if (value == undefined) return null;
            let obj = JSON.parse(value);
            if (obj.outOfDate && obj.outOfDate <= new Date()) {
                return '缓存已过期'
            } else {
                return obj;
            }
        }
        return null;
    },
    clear: () => {
        sessionStorage.clear();
    },
    remove: (key) => {
        sessionStorage.removeItem(key);
    },
    length: () => {
        return sessionStorage.length;
    },
    has: (key) => {
        return localStorage.hasOwnProperty(key);
    }

}
export default sessionContext;