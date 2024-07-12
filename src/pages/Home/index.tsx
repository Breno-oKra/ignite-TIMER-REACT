import { HandPalm, Play } from "phosphor-react";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,

} from "./style";
import { useContext } from "react";
import * as zod from 'zod'
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})
type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>
export function Home() {
  const { activeCycle, createNewCiclo, InterruptCurrentCycle } = useContext(CyclesContext)


  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch } = newCycleForm


  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCiclo)} action="">

        {/*  formPrivder é proprio do hook provider */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountDownButton onClick={InterruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled} >
            <Play size={24} />
            começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
