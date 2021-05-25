
const localStorage = window.localStorage;
const localContext = {
    put: (key,value) => {
        if(!localStorage.getItem(key)) {
            localStorage.setItem(key,JSON.stringify(value));
        }
    },
    set: (key,value,outOfDate = 0) => {
        const data = {
            value,
            outOfDate
        }
        console.log(data)
        if(!localStorage.getItem(key)) {
            localStorage.setItem(key,JSON.stringify(data));
        }
    },
    get: (key) => {
        if(localStorage.getItem(key)) {
            let value = localStorage.getItem(key);
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
        localStorage.clear();
    },
    remove: (key) => {
        localStorage.removeItem(key);
    },
    length: () => {
        return localStorage.length;
    },
    has: (key) => {
        return localStorage.hasOwnProperty(key);
    }

}
export default localContext;