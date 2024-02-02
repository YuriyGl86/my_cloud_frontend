export const parsError = e => {
    let message = '';
    for (let i in e.data) {
        message += `${i} : ${e.data[i]}`;
    }
    return message;
};
