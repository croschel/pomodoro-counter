import { ReactNode, createContext, useReducer, useState } from 'react'
import { Cycle } from '../@types/cycles'
import { cyclesReducer } from '../reducers/cycles'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle?: Cycle
  activeCycleId?: string
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (value: number) => void
  handleCreateNewCycle: (data: CreateCycleData) => void
  handleInterruptCycle: () => void
}

interface PropsComponent {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider = ({ children }: PropsComponent) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const { cycles, activeCycleId } = cyclesState

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const handleCreateNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: new Date().getUTCMilliseconds().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
    setAmountSecondsPassed(0)
  }

  const handleInterruptCycle = () => {
    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
  }

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: 'MARK_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        handleCreateNewCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
