
const sessionStorage = window.sessionStorage;
const sessionContext = {
    put: (key,value) => {
        if(!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key,JSON.stringify(value));
        }
    },
    set: (key,value,outOfDate = 0) => {
        const data = {
            value,
            outOfDate
        }
        console.log(data)
        if(!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key,JSON.stringify(data));
        }
    },
    get: (key) => {
        if(sessionStorage.getItem(key)) {
            let value = sessionStorage.getItem(key);
            if (value == undefined) return null;
            let obj = JSON.parse(value);
            if (!!obj.outOfDate && (obj.outOfDate <= new Date() || obj.outOfDate === 0)) {
                this.remove(key)
                return null;
            } else {
                return obj.value;
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
        return sessionStorage.hasOwnProperty(key);
    }

}
export default sessionContext;