

module.exports = {
    put: (key,value) => {
        if(!localStorage.getItem(key)) {
            localStorage.setItem(key,JSON.stringify(value));
        }
    },
    set: (key,value,outOfDate) => {
        value.outOfDate = outOfDate;
        if(!localStorage.getItem(key)) {
            localStorage.setItem(key,JSON.stringify(value));
        }
    },
    get: (key) => {
        if(localStorage.getItem(key)) {
            let obj = JSON.parse(localStorage.getItem(key));
            if (obj.outOfDate && obj.outOfDate <= new Date()) {
                return '缓存已过期'
            } else {
                return obj;
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

}