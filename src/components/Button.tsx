import { ButtonContainer, ButtonVariant } from "./Button.style"

interface ButtonProps{
    variant?: ButtonVariant
}
export function Button({variant = 'primary'}:ButtonProps){
    return <ButtonContainer variant={variant}>Voltcha aqui</ButtonContainer>
}