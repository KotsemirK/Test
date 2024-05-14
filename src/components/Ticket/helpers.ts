export function formatNumberWithSpaceSeparator(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const getStopsLabel = (stops: number) => {
    switch (stops) {
        case 0:
            return "БЕЗ ПЕРЕСАДОК";
        case 1:
            return "1 ПЕРЕСАДКА";
        case 2:
            return "2 ПЕРЕСАДКИ";
        case 3:
            return "3 ПЕРЕСАДКИ";
        default:
            return `${stops} ПЕРЕСАДКИ`;
    }
};