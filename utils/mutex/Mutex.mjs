export class Mutex {
    constructor() {
        this.locked = false;
        this.queue = [];
    }

    lock = async () => {
        if (this.locked) {
            return new Promise((resolve) => {
                this.queue.push(resolve);
            });
        }

        this.locked = true;
        return;
    };

    unlock = () => {
        if (this.queue.length > 0) {
            const next = this.queue.shift();
            next();
            return;
        }
        this.locked = false;
    };
}
