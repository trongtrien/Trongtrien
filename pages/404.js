/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
export default function NoMatch() {
    return (
      <div className="NoMatch">
      <div className="NoMatch__body">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="NoMatch__body__main">
           <h1>404</h1>
           <img width={200} src="/media/img/opps.png" alt="" />
           <p>Trang không tồn tại ... Nothing to see here</p>
           <p>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</p>
           <button style={{color:"#fff"}} onClick={()=>{window.history.back()}}>Go back</button>&nbsp;&nbsp; Or &nbsp;&nbsp;<button ><a href="/">Go home</a></button>
        </div>
	      <div className="clear"></div>
      </div>
      </div>
    );
  }