export const getFormattedDateTime = (_date: number | Date | string) => {
    const date = new Date(_date);

    return `${pad(date.getDate())} / ${pad(
        date.getMonth() + 1,
    )} / ${date.getFullYear()} ${pad(date.getHours())}:${pad(
        date.getMinutes(),
    )}`;
};

const pad = (n: number) => n.toString().padStart(2, '0');
