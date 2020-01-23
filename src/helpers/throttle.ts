export function throttle(fn: { (...args: any[]): any }, timeout: number) {
    let ready = true;
    return (...args: any[]) => {
        if (!ready) { return; }
        ready = false;
        fn(...args);
        setTimeout(() => {
            ready = true;
        }, timeout);
    };
}
