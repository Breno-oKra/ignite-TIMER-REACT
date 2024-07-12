
import { ReactNode, createContext, useState } from "react"


interface CreateCycleData{
    task:string;
    minutesAmount:number
}
interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}
interface CyclesContextTypes {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondPassed: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCiclo:(data:CreateCycleData) => void;
    InterruptCurrentCycle:() => void

}
export const CyclesContext = createContext({} as CyclesContextTypes)

// ReactNode é qualquer html,Jsx valido
interface CyclesContextProviderProps {
    children:ReactNode
}
export function CyclesContextProvider({children}:CyclesContextProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycledId] = useState<string | null>(null);
    const [amountSecondPassed, setAmountSecondsPassed] = useState(0);
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }
    function markCurrentCycleAsFinished() {
        setCycles(
            state => state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() };
                } else {
                    return cycle;
                }
            })
        );
    }
    function createNewCiclo(data: CreateCycleData) {
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        setCycles((state) => [...state, newCycle]);
        setActiveCycledId(id);
        setAmountSecondsPassed(0);
        /* reset(); */
    }




    function InterruptCurrentCycle() {
        setActiveCycledId(null);
        setCycles(
            state => state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() };
                } else {
                    return cycle;
                }
            })
        );
    }
    return (

        < CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondPassed, setSecondsPassed,createNewCiclo,InterruptCurrentCycle}
        }>
            {children}
        </CyclesContext.Provider >
    )
}