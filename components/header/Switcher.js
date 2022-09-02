import * as React from 'react'
import { useTheme } from 'next-themes'
import NightlightIcon from '@mui/icons-material/Nightlight'
import LightModeIcon from '@mui/icons-material/LightMode'

export default function ThemeSwitcher() {
  const [themeswitch, setThemeswitch] = React.useState('')
  const { theme, setTheme } = useTheme()
  React.useEffect(() =>{
    setThemeswitch(theme)
  },[theme])
  return (
    <div className={`switch ${themeswitch==="dark"?'switchdark':'switchlight'} pt-1`}>
      <label htmlFor="switcher" onClick={() => {
        if(theme === "dark"){
          setTheme('light')
        } else {
          setTheme('dark')
        }
      }}>
        <div className="icon one">
          <LightModeIcon />
        </div>
        <div className="icon two">
          <NightlightIcon />
        </div>
      </label>
    </div>
  );
}
