const getDate = () => {
    let currentDate = new Date();

    let year = currentDate.getFullYear().toString();

    let month = (currentDate.getMonth()+1).toString();

    if (month < 10) {
        month = month.padStart(2, "0")
    }

    let day = currentDate.getDate().toString();
    
    return `${year}-${month}-${day}`;
}

export { getDate };