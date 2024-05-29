import { Play } from "phosphor-react";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmoutInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from "./style";

const newCycleFormValidationSchema = zod.object({
  //string que tenha no minimo 1 caracterer
  task:zod.string().min(1,'Informe a tarefa'),
  minutesAmount:zod
  .number()
  .min(5, 'O ciclo precisa se de no mínimo 5 minutos').
  max(60,'O ciclo precisa se de no mínimo 60 minutos'),
})

// ao invez de usar o interface, pegamos a tipagem recebida do proprio zod.object que configuramos
// e precisamos usar typeof para dizer ao js que é uma typagem
// essa é uma função do proprio zod
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
/* interface NewCycleFormData{
  task:string;
  minutesAmount:number
} */
export function Home() {

  // so podemos tipar funções proprias quando passar o mouse por cima e ela estiverem como <any> ou <{} any>
  const {register,handleSubmit,watch,formState,reset} = useForm<NewCycleFormData>({
    resolver:zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task:'',
      minutesAmount:0
    }
  })
  const task = watch('task')
  const isSubmitDisabled = !task
  console.log(formState.errors)
  function handleCreateNewCiclo(data:NewCycleFormData){
    console.log(data)
    //reset so devolve os valores originais que configuramos no defaultValues
    reset()
  }
  return (
    <HomeContainer>
     
      <form onSubmit={handleSubmit(handleCreateNewCiclo)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="taks"
            type="text"
            placeholder="De um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto1"/>
            <option value="Projeto2"/>
            <option value="Projeto3"/>
            <option value="Projeto4"/>
          </datalist>
          <label htmlFor="minutesAmout">durante</label>
          {/* aqui usamos {...register para espalhar sua propiedade, e damos o nome e atribuimos valor number} */}
          <MinutesAmoutInput id="minutesAmout" type="number" step={5} min={5} max={60}  placeholder="00"  {...register('minutesAmount',{valueAsNumber:true})} />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton type="submit" disabled={isSubmitDisabled} >
          <Play size={24} />
          começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
