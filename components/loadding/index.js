import React from 'react'
import Image from 'next/image'

const Loadding = () => {
    const styles = {
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "#ffffff",
        zIndex: "1000"
    }
  return (
    <div style={styles}>
        <div style={{position: "absolute", margin: "auto", top: "48%", left: "50%", transform: "translateX(-50%)", alignItem: "center", textAlign: "center"}}>
            <Image
                    src='/media/img/loadding.svg'
                    alt='loadding'
                    width={60}
                    height={60}/>
            <h5>loadding ...</h5>
        </div>
    </div>
  )
}

export default Loadding