export function TimeCalculator (seconds) {
    const hh = Math.floor(seconds / 60 / 60)
    const mm = pad(Math.floor((seconds-hh*(3600)) / 60))
    const ss = pad(seconds - (mm*60))
    
    function pad (string) {
        return ('0' + string).slice(-2)
      }
    return{hh,mm,ss}
}