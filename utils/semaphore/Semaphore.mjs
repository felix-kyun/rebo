export class Semaphore {
    constructor(concurrency = 1) {
        this.queue = [];
        this.activeCount = 0;
        this.concurrency = concurrency;
    }

    async acquire() {
        if (this.activeCount < this.concurrency) {
            this.activeCount++;
            return;
        }

        return new Promise((resolve) => {
            this.queue.push(resolve);
        });
    }

    async release() {
        this.activeCount--;

        if (this.queue.length > 0) {
            const resolve = this.queue.shift();
            resolve();
        }
    }

    async run(task) {
        await this.acquire();
        try {
            return await task();
        } finally {
            await this.release();
        }
    }
}
