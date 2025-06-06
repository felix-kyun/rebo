export async function waitFor(conditionFunction, timeout = 50) {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (conditionFunction()) {
                clearInterval(interval);
                resolve();
            }
        }, timeout);
    });
}
