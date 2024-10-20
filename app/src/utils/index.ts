export const classNames = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
};

export const debounce = <T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void => {
    let timeout: ReturnType<typeof setTimeout> | null;

    return (...args: Parameters<T>) => {
        // Clear the previous timeout if it exists
        if (timeout) {
            clearTimeout(timeout);
        }

        // Set a new timeout
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
};