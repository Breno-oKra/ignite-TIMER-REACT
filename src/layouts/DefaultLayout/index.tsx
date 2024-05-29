import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./style";

export function DefaultLayout(){
    return(
        <LayoutContainer>
            <Header/>
            {/* Outlet funciona como um children, nele sera colocado o conteudo da propria pagina, sendo a home, ou history e outras caso haja */}
            <Outlet/>
        </LayoutContainer>
    )
}