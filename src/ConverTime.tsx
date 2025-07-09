
//This function converts the military time that is recived from the weather api and convers it to
//regualar 12 hour format
export function convertTime(time: string): string {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
        throw new Error("Invalid time format. Expected HH:MM:SS in 24-hour format.");
    }

    const [hourStr, minute, second] = time.split(':');
    let hour: number = parseInt(hourStr, 10);
    const ampm: string = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;

    return `${hour}:${minute}:${second} ${ampm}`;
}
