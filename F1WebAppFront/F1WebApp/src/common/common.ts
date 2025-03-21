export const yearsList: number[] = (() => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let year = 1950; year < currentYear; year++) {
        years.push(year);
    }

    return years;
})();

export const currentDate = new Date();

