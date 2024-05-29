import styled from "styled-components";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  h1{
    font-size: 1.5rem;
    color: ${props => props.theme["gray-100"]};
  }
`;
export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table{
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
        th{
            background-color: ${props => props.theme["gray-600"]};
            padding: 1rem;
            text-align: left;
            color: ${props => props.theme["gray-100"]};
            font-size: 0.875rem;
            line-height: 1.6;
            &:first-child{
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }
            &:last-child{
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }
        td{
            background-color: ${props => props.theme["gray-700"]};
            border-top: 4px solid ${props => props.theme["gray-800"]};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;
            &:first-child{
                width: 50%;
                padding-left: 1.5rem;
            }
            &:last-child{
                padding-right: 1.5rem;
            }

        }
    }
`;
const StatusColors = {
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500',
} as const
// passe o mouve em cima de StatusColors para ver a diferença de com (as const) e sem (as const)
// o as const diz que a const StatusColors é somente essas 3 propriedades(yellow,green,red) não podendo alterar


interface StatusProps{
    /* statusColor: 'yellow' | 'red' | 'green' ; */
    //para reaproveitar as keys usadas na const statusColors que eram as mesmas
    //por que a cores vão ser fixas
    statusColor: keyof typeof StatusColors
}
export const Status = styled.span<StatusProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before{
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background:${props => props.theme[StatusColors[props.statusColor]]};
    }
`
