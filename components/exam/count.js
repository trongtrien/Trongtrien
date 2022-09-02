import React from "react";
import { TimeCalculator } from "../../utils/duration";

export function CountDown(seconds){
    const [second, setSecond] = React.useState(seconds)
    React.useEffect(() => {
      let myInterval = setInterval(() => {
        if (second > 0) {
          setSecond(second - 1);
        } else {
          clearInterval(myInterval)
        } 
    }, 1000)
    return ()=> {
        clearInterval(myInterval);
      };
    })
    const time = TimeCalculator(second)
  return {time, second}
}