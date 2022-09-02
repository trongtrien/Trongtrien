export function TimeCalculator (seconds) {
    const hh = Math.floor(seconds / 60 / 60).toString()
    const mm = pad(Math.floor((seconds-hh*(3600)) / 60))
    const ss = pad(seconds - (mm*60))
    function pad (string) {
        return ('0' + string).slice(-2)
      }
    return{hh:seconds>0?hh:'00',mm:seconds>0?mm:'00',ss:seconds>0?ss:'00'}
}