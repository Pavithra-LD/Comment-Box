
import './App.css';
import React,{useState} from 'react'
import axios from '../../billing-app/node_modules/axios';


const myGif=['https://media0.giphy.com/media/xThuWcaa4U4XZQDgvm/200.gif?','https://media0.giphy.com/media/xThuWcaa4U4XZQDgvm/200_d.gif?','https://media2.giphy.com/media/zw6GmBnHQTzxe/200.gif?cid=09a79af1ti91qrjw0t0if5eolcq3rc0ujwdedhvxaqoqzhig&rid=200.gif&ct=g','https://media1.giphy.com/media/smekUnGXJ0kcdQHWeF/200.gif?cid=09a79af1ti91qrjw0t0if5eolcq3rc0ujwdedhvxaqoqzhig&rid=200.gif&ct=g']

function App() {

  const[message, setMessage]=useState('')
  const[toggle, setToggle]=useState(false)
  const[comments, setComments]=useState([])
  const[searchGif, setSearchGif]=useState('')
  const[gif,setGif]=useState(myGif)
  const[commentGif,setCommentGif]=useState('')
  
  
  
  const handleMessage=(e)=>{
    setMessage(e.target.value)
    
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    let form={
      "comment":message,
      "gif":commentGif
    }
     setComments([...comments,form])
    
    setMessage('')
    setGif('')
    setSearchGif('')
    setCommentGif('')
    setToggle(false)
    
  }

  const handleGif=()=>{
    setToggle(true)
  }

  const handleSearchGif=(e)=>{
    setSearchGif(e.target.value)
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=LGiaW3dNLINlct3z28yDOpgi3qcuGBNw&limit=10&offset=0&q=${searchGif}`)
    .then((response)=>{
      const result=response.data.data.map((ele=>{
        return ele.images.fixed_height.url
      }))
      //console.log(result)
      setGif(result)
    })

  }

  const handleGifChange=(gif)=>{
    setCommentGif(gif)
    setGif([].concat(gif))
  }

  console.log(gif)
  
 
  return (
    <div className="row">
        <div className="col-md-6">
            <h2>All Comments</h2>
              {comments.length>0 && comments.map((ele,i)=>{
                return <p key={i}>{ele.comment} <img src={ele.gif}/></p>
              })}
      </div>


      <div className="col-md-6"> 
      
          <h3>Post Comments</h3>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={message} 
            onChange={handleMessage} 
            placeholder="Write Comments"
            
            style={{width:"20rem"}}
            />     

            <input 
            type="submit" 
            value="Post" 
            className="btn btn-primary" 
            style={{marginLeft:"10rem"}} 
            />
        </form>  

            <button type="button" className="btn btn-light" onClick={handleGif}>GIF</button>

                
              
              {toggle &&

                <div >

                  <input type="text" value={searchGif} onChange={handleSearchGif} placeholder="Search Gif"/>
                  <div class="row">
                    {gif.length>0 && gif.map((ele,i)=>{
                        return (
                          
                            <div key={i}className="col-md-3">
                              <img style={{height:"10rem",width:"10rem"}}key={i}src={ele} onClick={()=>{handleGifChange(ele)} }/>
                            </div>
                          
                        )
                      })}
                      </div>
                </div>
              }

        </div>

        
          
    </div>
  )
}

export default App;
