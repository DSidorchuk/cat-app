import { styled } from "styled-components";

import { useTheme } from "./use-theme";
import { ReactComponent as EyeLight} from '../../assets/eye-light.svg';
import { ReactComponent as EyeDark} from '../../assets/eye-dark.svg';
import { ReactComponent as LightSwitch} from '../../assets/light-theme.svg';
import { ReactComponent as DarkSwitch} from '../../assets/dark-theme.svg';



const Wrapper = styled.div`
   width: 77px;
   height: 24px;
   display: flex;
   justify-content: space-between;
   cursor: pointer;
`;

const Eye = styled.div`
   width: 24px;
   height: 24px;
   background-color: var(--white-color);
   border-radius: var(--rad-xl);
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ThemeSwitcher = () => {
   const [theme, toggleTheme] = useTheme();

   return (
      <Wrapper onClick={toggleTheme}>
         <Eye>
            {theme === 'light' ? <EyeLight/> : <EyeDark/>}
         </Eye>
         {theme === 'light' ? <LightSwitch/> : <DarkSwitch/>}
      </Wrapper>
   )
}

export {ThemeSwitcher};

