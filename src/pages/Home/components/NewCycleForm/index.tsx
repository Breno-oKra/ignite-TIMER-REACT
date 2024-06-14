import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmoutInput, TaskInput } from "./style";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa se de no mínimo 5 minutos")
    .max(60, "O ciclo precisa se de no mínimo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

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