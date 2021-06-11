export class PromiseChain {
 
    public static newChain(): Promise<void> {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve();
            }, 100);
        });
    }
 
    public static newParallelChain<T>(...promises: Promise<T>[]) {

        // return Promise.all(promises.map(p => p.catch(e => e)));
        return Promise.all(promises);
    }   
}

export class ParallelPromise {

    promises: Array<Promise<any>> = null;

    public add(promise: Promise<any>): ParallelPromise {

        if (this.promises == null) {
            this.promises = new Array<Promise<any>>();
        }

        this.promises.push(promise);

        return this;
    }

    public start() {

        if (this.promises == null) {
            return new Promise((resolve, reject) => {

                setTimeout(() => {
                    resolve(true);
                }, 100);
            });
        }
        return Promise.all(this.promises);
    }
}

