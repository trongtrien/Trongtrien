import React, { useState, useRef, useEffect} from "react"
import styles from './dic.module.css'
   
const SeachDic = ({ datas }) => {
        const [query, setQuery] = useState('');
        const [result, setResult] = useState([]);
        const [newquery, setNewquery] = useState('');
        const [newData, setnewData] = useState('');
        const ref = useRef()

        useEffect(() => {
          let componentDidMount = true
          if(datas&&componentDidMount) setnewData(datas.find(lesson => lesson.question === query));
          return ()=>(componentDidMount = false)
        },[datas,query])

        // This function is triggered when the Search buttion is clicked
        const search = () => {
          setNewquery(query)
          if(!newData) {setResult(<h4 className="mt-2 text-light">Từ bạn nhập không đúng</h4>)
            } else { setResult(<div className="search-result">
                              <div key={newData.id} className="text-light pt-3 pb-3">
                                <table>
                                  <tbody>
                                    <tr className="border-0">
                                      <td className="p-2 border-0 text-start"><h5><span>Từ Hàn:</span></h5></td>
                                      <td className="p-2 border-0 text-start"><h5><span className="batangche">{newData.question}</span></h5></td>
                                    </tr>
                                    <tr className="border-0">
                                      <td className="p-2 border-0 text-start"><h5><span>Nghĩa Việt:</span></h5></td>
                                      <td className="p-2 border-0 text-start"><h5><span>{newData.answer}</span></h5></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-light pb-3 pt-3 ps-2 border-top border-warning">Ghi chú: {newData.description}</div>
                              <div>
                                  <audio src={`/media/audio/u${newData.game_id}/${newData.audio}.mp3`} width="750" height="500" controls controlsList="nodownload"></audio>
                              </div>
                          </div>
                          )}}

        return (
          <div className="bg-secondary rounded-3 p-3 mb-4">
            <div>
              <input
                ref={ref}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tra từ vựng"
                className="input btn bg-dl text-dl"
                style={{borderTopRightRadius: "0", borderBottomRightRadius: "0"}}
                onKeyDown={(e) => {
                  if(e.code==='Enter'||e.code==='NumpadEnter'){
                    search()
                    if(newData){
                      setTimeout(()=>setQuery(''),10)
                    }
                  }
                }}
              />
              <button className="btn btn-primary" style={{borderTopLeftRadius: "0", borderBottomLeftRadius: "0", border: "0 0"}}  type="submit" onClick={()=>{
                search()
                if(newData){
                  setQuery('')
                }
                ref.current.focus()
                }}>Search</button>
            </div>
            {newquery ? (result) : (<h4 className="mt-2 text-light">Mời bạn nhập từ để tìm kiếm</h4>)}
          </div>
        );
      };
      
export default SeachDic
