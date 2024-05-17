export const setHistory = (list) => {
    localStorage.setItem('history-list', JSON.stringify(list))
}
export const getHistory = () => {
    const res = localStorage.getItem('history-list')
    return res ? JSON.parse(res) : []
}

export const setUserId = (userid) => {
    localStorage.setItem('USERID',JSON.stringify(userid))

}

export const getUserId = () => {
    const res = localStorage.getItem('USERID')
    return res ? JSON.parse(res) : ''
}

export const removeUserId = () => {
    localStorage.removeItem('USERID')
}