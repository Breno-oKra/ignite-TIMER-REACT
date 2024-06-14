import { HandPalm, Play } from "phosphor-react";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,

} from "./style";
import { useEffect, useState } from "react";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";


interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycledId] = useState<string | null>(null);
 
  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);



  const isSubmitDisabled = !task;
  
  function handleCreateNewCiclo(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    // sempre que depender do valor anterior, é indicado usar esse formato com arrow func
    // antes: setCycles([...cycles,newCycles])
    setCycles((state) => [...state, newCycle]);
    setActiveCycledId(id);
    setAmountSecondsPassed(0);
    reset();
  }
  
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0;
  
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  
  // padStart preenche string que não tem o tamnho atribuido ex: configuramos que a string tem que ter 2 caracter
  // ou seja se a string for 1, ela vai adionar o 0 que informamos na frente para preencher 2 caracter, em caso de 10 para cima, ela não adiciona
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");
  
  useEffect(() => {
    if (activeCycle) {
      document.title = `Timer ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  /** Props Drilling -> quando tem muitas propriedades apenas para comunicação entre componentes
   * para resolver isso usamos a Context API -> permite compartilharmos informações ebtre varios componentes ao mesmo tempo
   * 
   * 
  */

  const task = watch("task");
  function handleInterruptCycle() {
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
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCiclo)} action="">
        <NewCycleForm/>
        {/* 
          exemplo de props drilling - muitas informações e ainda falta
        <Countdown activeCycle={activeCycle} setCycles={setCycles} activeCycleId={activeCycleId}/> 
        */}
        <Countdown activeCycle={activeCycle} setCycles={setCycles} activeCycleId={activeCycleId}/>
        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
