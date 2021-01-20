export const SIGNAL_TYPES = ['price_below', 'price_above', 'wait_seconds'];

export type IFlowStepType = 'buy' | 'sell' | 'signal';

export interface IFlowStep {
    _id?: any;
    ticker?: string;
    state?: 'waiting' | 'executed' | 'failed';
    type?: IFlowStepType;
    amount?: number;
    createdAt?: Date;
    executedAt?: Date;
    signalType?: 'price_below' | 'price_above' | 'wait_seconds';
    signalValue?: number;
    order?: any;
    children?: IFlowStep[]; // only on the editor
}

export interface IFlow {
    _id?: string;
    title?: string;
    status?: string;
    steps?: IFlowStep[];
}
