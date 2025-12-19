class ReqeustQueue {
    private timestamps: number[]
    private maxPerWindow: number
    private windowMs: number
    constructor(maxPerWindow:number, windowMs:number) {
        this.timestamps = []
        this.maxPerWindow = maxPerWindow;
        this.windowMs = windowMs
    }

    async enqueue(requestFn: () => any){
        const now = Date.now()

        this.timestamps = this.timestamps.filter(t => now -t < this.windowMs)

        if(this.timestamps.length >= this.maxPerWindow){
            const oldestRequest = this.timestamps[0]
            const waitTime = this.windowMs - (now - oldestRequest)

            console.log(`Queue full, waiting ${waitTime}ms before sending request`);
            await new Promise(resolve => setTimeout(resolve, waitTime + 100)); // +100ms buffer
        }
        this.timestamps.push(Date.now());
        return await requestFn();
    }
}

const requestQueue = new ReqeustQueue(100, 60000)

export default requestQueue