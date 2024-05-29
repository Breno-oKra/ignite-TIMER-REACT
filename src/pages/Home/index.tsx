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

//para validar informações vindas em objectos do form ex: {name:'breno',idade:7}, caso fosse um array seria zod.array
// dentro dele configuramos como queremos tratar os campos
const newCycleFormValidationSchema = zod.object({
  //string que tenha no minimo 1 caracterer
  task:zod.string().min(1,'Informe a tarefa'),
  minutesAmount:zod.number().min(5).max(60),
})
export function Home() {

  
  // quanso usar controlled/ uncontrolled
  //controlled é colocar value, e onChange para que tenhamos controle total do campo
  //uncontrolled é quando pegamos os valores somente quando é feito o submit
  // uncontrolled é usado mais para quando a formularios muito grandes, pois a cada letra digitada,
  //a aplicação atualiza e isso em uns 20, 100 input deixaria a aplicação lerda
  // nessa aplicação usaremos a react hook form, que usa esse dois conceitos


  //register para registrar o campo
  //handle submit para capturar e tratar os dados apos o submit
  //watch para poder verficar um campo especifico, como valores 
  //formState podemos ver as informações vinda apos o submit, inclusives os erros
  const {register,handleSubmit,watch,formState} = useForm({
    resolver:zodResolver(newCycleFormValidationSchema)
  })
  const task = watch('task')
  const isSubmitDisabled = !task
  console.log(formState.errors)
  function handleCreateNewCiclo(data:any){
    console.log(data)
  }
  return (
    <HomeContainer>
      {/* dentro de submit usamos a função propria do reacthookform vinda do useForm, dentro dele vai a função que usamos para receber os dados */}
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
