export const setHistory = (list) => {
    localStorage.setItem('history-list', JSON.stringify(list))
}
export const getHistory = () => {
    const res = localStorage.getItem('history-list')
    return res ? JSON.parse(res) : []
}