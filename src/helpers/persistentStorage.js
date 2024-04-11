const getItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.error('error in getting data from localStorage', e);

        return null;
    }
};

const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('error in setting data to localStorage', e);
    }
};

export {
    getItem,
    setItem,
};