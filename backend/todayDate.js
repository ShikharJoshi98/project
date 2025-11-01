export const updateDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
};

export const dateConverter = (date) => {
            const [y, m, d] = date.split('-');
            const newDate = String(d + '-' + m + '-' + y);
            return newDate;
}