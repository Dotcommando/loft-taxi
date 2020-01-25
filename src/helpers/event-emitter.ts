export const eventEmitter: IEventEmitter = {
    events: {},
    dispatch: function(event: string, ...data: any[]) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(...data))
    },
    subscribe: function(event: string, callback: IEventEmitterCallback): EventEmitterSubscription {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
        return new EventEmitterSubscription(event, this, callback);
    },
};

export class EventEmitterSubscription {
    constructor(event: string, eventEmitter: IEventEmitter, callback: IEventEmitterCallback) {
        this.event = event;
        this.eventEmitter = eventEmitter;
        this.callback = callback;
    }

    private event: string = '';
    private eventEmitter: IEventEmitter;
    private callback: IEventEmitterCallback;

    public unsubscribe(): void {
        if (!this.event) return;
        if (!this.eventEmitter.events[this.event]) return;
        const pos = this.eventEmitter.events[this.event].indexOf(this.callback);
        if (pos === -1) return;
        this.eventEmitter.events[this.event].splice(pos, 1);
        if (this.eventEmitter.events[this.event].length === 0) delete this.eventEmitter.events[this.event];
    }
}

export interface IEventEmitter {
    events: { [n: string]: any[] },
    dispatch: { (event: string, data?: any): void },
    subscribe: { (event: string, callback: IEventEmitterCallback): EventEmitterSubscription },
}

export interface IEventEmitterCallback { (data?: any): void }
