export async function waitFor(conditionFunction, timeout = 50) {
    return new Promise((resolve, reject) => {
        if (conditionFunction()) resolve();

        const interval = setInterval(() => {
            if (conditionFunction()) {
                clearInterval(interval);
                resolve();
            }
        }, timeout);
    });
}
