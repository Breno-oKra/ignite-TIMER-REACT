import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./style";
import { differenceInSeconds } from "date-fns";

interface CountdownProps{
  activeCycle:any;
  setCycles:any;
  activeCycleId:any
}
export function Countdown({activeCycle,setCycles,activeCycleId}:CountdownProps) {
  const [amountSecondPassed, setAmountSecondsPassed] = useState(0);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsInDiference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (secondsInDiference >= totalSeconds) {
          setCycles(
            state => state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsInDiference);
        }
      }, 1000);
    }
    // return so é ativado quando a variavel activeCycle é alterada, assim o use effect vai ser chamado novamente
    // ou seja o que tinha antes o return vai ser ativado para que as novas informações sejam feitas
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds,activeCycleId]);
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
