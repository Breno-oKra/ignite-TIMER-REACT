

import { ReactNode, createContext, useState, useReducer, useEffect } from "react"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {
    task: string;
    minutesAmount: number
}

interface CyclesContextTypes {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondPassed: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCiclo: (data: CreateCycleData) => void;
    InterruptCurrentCycle: () => void

}
export const CyclesContext = createContext({} as CyclesContextTypes)

// ReactNode é qualquer html,Jsx valido
interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    /* const [cycles, setCycles] = useState<Cycle[]>([]); */

    // dispatch é tipo setCycles, um nome que demos, mas nesse caso,e ele vai fazer a função action e não alterar como era em setCycles
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, (inithialState) => {
        const storedStateAsJSON = localStorage.getItem("@timerBreno-okra:cycles-state")
        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }
        return inithialState
    })
    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem("@timerBreno-okra:cycles-state", stateJSON)
    }, [cyclesState])

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    /*  const [activeCycleId, setActiveCycledId] = useState<string | null>(null); */
    const [amountSecondPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            )
        }
        return 0
    });

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }
    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
        /*  setCycles(
             state => state.map((cycle) => {
                 if (cycle.id === activeCycleId) {
                     return { ...cycle, finishedDate: new Date() };
                 } else {
                     return cycle;
                 }
             })
         ); */
    }
    function createNewCiclo(data: CreateCycleData) {
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        dispatch(addNewCycleAction(newCycle))
        /*   setCycles((state) => [...state, newCycle]); */

        setAmountSecondsPassed(0);
        /* reset(); */
    }




    function InterruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
        /*  setCycles(
             state => state.map((cycle) => {
                 if (cycle.id === activeCycleId) {
                     return { ...cycle, interruptedDate: new Date() };
                 } else {
                     return cycle;
                 }
             })
         ); */
    }
    return (

        < CyclesContext.Provider value={{ cycles, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondPassed, setSecondsPassed, createNewCiclo, InterruptCurrentCycle }
        }>
            {children}
        </CyclesContext.Provider >
    )
}