import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any)

function CountDown() {
    const { activeCycle } = useContext(CyclesContext)
    return (
        <h1>Countidoul {activeCycle}</h1>
    )
}
function NewCycleForm() {
    const { setActiveCycle,activeCycle } = useContext(CyclesContext)
    return (
        <h1>Newsofboysdaargentina
            <button onClick={() => {
                setActiveCycle(2)
            }}>
                altera isso ae
            </button>
            {activeCycle}
        </h1>
    )
}
export function Home() {
    const [activeCycle, setActiveCycle] = useState(0)
    return (
        <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
            <div>
                <NewCycleForm />
                <CountDown />
            </div>

        </CyclesContext.Provider>
    )
}