export type IFlowStepType = 'buy' | 'sell' | 'signal'

export interface IFlowStep {
  ticker?: string
  state?: 'waiting' | 'executed' | 'failed'
  type?: IFlowStepType
  amount?: number
  waitFor?: number
  createdAt?: Date
  executedAt?: Date
}

export interface IFlow {
  _id?: string
  title?: string
  status?: string
  steps?: IFlowStep[]
}
