import { styled } from "styled-components";

import { useTheme } from "./use-theme";
import { ReactComponent as EyeLight} from '../../assets/eye-light.svg';
import { ReactComponent as EyeDark} from '../../assets/eye-dark.svg';
import { ReactComponent as LightSwitch} from '../../assets/light-theme.svg';
import { ReactComponent as DarkSwitch} from '../../assets/dark-theme.svg';


const Wrapper = styled.div`
   display: flex;
   justify-content: space-between;
   width: 77px;
   height: 24px;
   cursor: pointer;
`;

const Eye = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 24px;
   height: 24px;
   background-color: var(--bg-light);
   border-radius: var(--rad-xl);
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

