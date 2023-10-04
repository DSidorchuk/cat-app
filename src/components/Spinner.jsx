import { Oval } from "react-loader-spinner";

export const Spinner = () => {
   return (
      <div style={{margin: '200px auto'}}>
         <Oval
            height={100}
            width={100}
            color="var(--pink-color)"
            secondaryColor="var(--pink-color-light)"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            strokeWidth={2}
            strokeWidthSecondary={2}
         />
      </div>
   )
}