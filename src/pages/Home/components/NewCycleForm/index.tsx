import { FormContainer, MinutesAmoutInput, TaskInput } from "./style";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { useFormContext } from "react-hook-form";


export function NewCycleForm() {
  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="taks"
        type="text"
        placeholder="De um nome para o seu projeto"
        list="task-suggestions"
        /* !! isso transforma o valor em boolean, ser tiver algo true, se não false */
        disabled={!!activeCycle}
        {...register("task")}
      />
      <datalist id="task-suggestions">
        <option value="Projeto1" />
        <option value="Projeto2" />
        <option value="Projeto3" />
        <option value="Projeto4" />
      </datalist>
      <label htmlFor="minutesAmout">durante</label>

      <MinutesAmoutInput
        id="minutesAmout"
        type="number"
        step={5}
        min={5}
        max={60}
        placeholder="00"
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}