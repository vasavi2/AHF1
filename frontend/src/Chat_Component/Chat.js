import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Plot from 'react-plotly.js';
// import userImageQuestion from "./profile.png"; // Profile picture for question asker
import bot from "./bot.png"
import userImageQuestion from "./profile.png"

import "./chat.css"

 
// function Chat() {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, How Can I help You",
//       sentTime: "just now",
//       sender: "ChatGPT"
//     }
//   ]);
//   const [isTyping, setIsTyping] = useState(false);
 
//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: "user"
//     };
 
//     const newMessages = [...messages, newMessage];
//     console.log("newMessages",newMessages.map((e)=>e.direction))
    
//     setMessages(newMessages);
 
//     // Initial system message to determine ChatGPT functionality
//     // How it responds, how it talks, etc.
//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };
 
//   async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
// //     // Format messages for chatGPT API
// //     // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
// //     // So we need to reformat
 
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if (messageObject.sender === "ChatGPT") {
//         role = "assistant";
//       } else {
//         role = "user";
//       }
//       return { role: role, content: messageObject.message}
//     });


//     const systemMessage={
//       role:"system",
//       content:"Explain all concepts like I am years old"
//     } 
 
 

//     const apiRequestBody = {
//       "model": "gpt-3.5-turbo",
//       "messages": [
//         systemMessage,  // The system message DEFINES the logic of our chatGPT
//         ...apiMessages // The messages from our chat with ChatGPT
//       ]
//     }

// // await fetch("http://localhost:9005/receive_data",{
//   // await fetch("http://localhost:9002/receive_data_final",{
//     await fetch("http://localhost:9007/receive_data_final_final",{


//   method:"POST",
//   headers:{
//     "Content-Type":"application/json"
//   },
//   body:JSON.stringify(apiRequestBody)
// }).then((data)=>{
//   return data.json();
// }).then((data)=>{
//   console.log("data",data.content)

//   // console.log(data.choices[0].message.content)
//         setMessages([...chatMessages, {
//         message: data.content,
//         sender: "ChatGPT"
//       }]);
//             setIsTyping(false);

// })


//   }
 
//   return (
//     <div className="App">
//       {/* <div style={{ position:"relative", height: "500px", width: "400px" ,marginLeft:"350px" ,marginTop:"40px"}}> */}
//       <div style={{ position:"relative", height: "560px", width: "1120px"  }}>

//       <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"

//             sx={{ mr: 2 }}
//           >
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{marginLeft:"400px"}}>
//             Copilot
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </Box>
//         {/* <MainContainer style={{color:"black"}}> */}
//           <ChatContainer>       
//             <MessageList
//               scrollBehavior="smooth"
//               typingIndicator={isTyping ? <TypingIndicator content="Thinking" /> : null}
//             >
//               {messages.map((message, i) => {
//                 console.log("Message--->",message)
//                 return <Message key={i} model={message} />
//               })}
//             </MessageList>
//             <MessageInput placeholder="Type message here" onSend={handleSend} />        
//           </ChatContainer>
//         {/* </MainContainer> */}
//       </div>
//     </div>
//   )
// }


function Chat() {
  const [messages, setMessages] = useState([
    {
//       message: `Hello, you can ask question from the following context
// 1. Current alerts in the system
// 2. Equipment troubleshooting guidelines
// 3. Correct Operating Ranges
// 4. Corrective Actions
// 5. Display Telemetry Data Time Trends
// 6. Forecast Telemetry Data
// 7. Compare Telemetry Data
// `,

message:`Hello,here to advise you on the below:-
1. Current alerts
2. Equipment Troubleshooting
3. Operating Ranges
4. Corrective Actions
5. Telemetry Data Time Trends
6. Forecast Telemetry Data
7. Compare Telemetry Data
`,
     
      sentTime: new Date().toLocaleTimeString(),
 
      sender: "ChatGPT"
    }
  ]);
 
  const [isTyping, setIsTyping] = useState(false);
  const [isImageClicked,setIsImageClicked]=useState(false)

  const handleImageClick=()=>{
    setIsImageClicked((prev)=>!prev)
  }

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
            sentTime: new Date().toLocaleTimeString(),
 
      sender: "user"
    };
 
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
 
    // Extract plain text from HTML message
    const plainTextMessage = extractPlainText(message);
 
    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    const responseData = await processMessageToChatGPT(plainTextMessage);

    console.log("responseData--->",responseData)




    if (responseData.x){
      setMessages(prev=>[...prev,{error:responseData.x,pdfpath:responseData.pdfpath,
        sentTime: new Date().toLocaleTimeString(),
      }])
    }


  

    if(responseData.compare_graph1){

      setMessages(prev=>[...prev,{
        x1_comp_values:responseData.x1_values_comp1,
        x11_comp_values:responseData.x2_values_comp2,
        y1_values_comp:responseData.y1_values_comp,
      sentTime: new Date().toLocaleTimeString(),
    }])
    }


    if(responseData.compare_graph2){
      
      setMessages(prev=>[...prev,{
        xx1_values_comp1:responseData.xx1_values_comp1 ,
        xx2_values_comp1:responseData.xx2_values_comp1        ,
        y2_values_comp1:responseData.y2_values_comp1,
      sentTime: new Date().toLocaleTimeString(),
    }])
    }


 
    // Check if the response contains an image
    if (responseData.image) {
      // Add the image message to the message list
      setMessages(prevMessages => [...prevMessages, {
        message: <img src={`data:image/png;base64,${responseData.image}`} alt="Plot" />,
        sender: "ChatGPT",
        sentTime: new Date().toLocaleTimeString(),
 
      }]);
    }

    if (responseData.x_values && responseData.y_values){
      setMessages(prevMessages=>
        [...prevMessages,
        {x_values:responseData.x_values,
          y_values:responseData.y_values,
          sentTime: new Date().toLocaleTimeString(),
        }
        ])
    }


    if (responseData.x_values_feature && responseData.y_values_feature){
      setMessages(prevMessages=>
        [...prevMessages,
        {x_values_feature:responseData.x_values_feature,
          y_values_feature:responseData.y_values_feature,
          sentTime: new Date().toLocaleTimeString(),
        }
        ])
    }
 
    // Check if the response contains content data
    if (responseData.content) {
      // Add the content message to the message list
      setMessages(prevMessages => [...prevMessages, {
        message: responseData.content,
        sender: "ChatGPT",
        sentTime: new Date().toLocaleTimeString(),


      }]);
    }

    

    if(responseData.table_content){
      let dictionary=responseData.table_content
        setMessages(prevMessages => [...prevMessages, {
        message: dictionary,
        sender: "ChatGPT",
        sentTime: new Date().toLocaleTimeString(),
      }]);
    }

 
    setIsTyping(false);
  };
 
  async function processMessageToChatGPT(message) {
    try {
      console.log("Message before sending:", message); // Log the message before sending
 
      const response = await fetch("http://localhost:9004/receive_data_final_final_video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message }) // Send only the plain text message
      });
 
      const data = await response.json();
      console.log("Data from backend:", data);
      return data; // Return the response data
 
    } catch (error) {
      console.error("Error fetching data:", error);
      return {}; // Return an empty object in case of error
    }
  }
 
  // Function to extract plain text from HTML message
  const extractPlainText = (htmlMessage) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlMessage;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

 

  const datas = [
    {
      x: messages.map(message => message.x_values).flat(),
      y: messages.map(message => message.y_values).flat(),
      type: 'scatter',
      mode: 'lines',
      name: "Comp_217FC7343A"
    }
  ];


  


  const firstXValuesFeature = messages.map(message => message.x_values_feature).flat().slice(0, -288);
const firstYValuesFeature = messages.map(message => message.y_values_feature).flat().slice(0, -288);
const lastXValuesFeature = messages.map(message => message.x_values_feature).flat().slice(-288);
const lastYValuesFeature = messages.map(message => message.y_values_feature).flat().slice(-288);

const firstFeatureTrace = {
  x: firstXValuesFeature,
  y: firstYValuesFeature,
  type: 'scatter',
  mode: 'lines',
  name:'Comp__Vib_X_217VI7113A',
  line: { color: 'blue' }
};

const lastFeatureTrace = {
  x: lastXValuesFeature,
  y: lastYValuesFeature,
  type: 'scatter',
  mode: 'lines',
  name:'Comp__Vib_X_217VI7113A_forecast',
  line: { color: 'orange' }
};



console.log("compare graphs ------>",messages)



// #compare 1
const compare_x1Values_graph1=messages.map(message => message.x1_comp_values).flat()
const compare_x2Values_graph1=messages.map(message => message.x11_comp_values).flat()
const compare_y_Values=messages.map(message => message.y1_values_comp).flat()

const firstFeatureTrace_compare1 = {
  x: compare_y_Values,
  y: compare_x1Values_graph1,
  type: 'scatter',
  mode: 'lines',
  name:'Comp_Stage_1_Flow_217FC7343A',
  line: { color: 'orange' }
};


const lastFeatureTrace_compare2 = {
  x: compare_y_Values,
  y: compare_x2Values_graph1,
  type: 'scatter',
  mode: 'lines',
  name:'Comp_DGS_DE_Primery_Seal_Vent_Diff_217PDI7162',
  line: { color: 'green' }
};



const compare_xx1Values_graph1=messages.map(message => message.xx1_values_comp1).flat()
const compare_xx2Values_graph1=messages.map(message => message.xx2_values_comp1  ).flat()
const compare_y2_Values=messages.map(message => message.y2_values_comp1).flat()

const firstFeatureTrace_compare11 = {
  x: compare_y2_Values,
  y: compare_xx1Values_graph1,
  type: 'scatter',
  mode: 'lines',
  name:'Comp_Stage_1_Flow_217FC7343A',
  line: { color: 'orange' }
};


const lastFeatureTrace_compare22 = {
  x: compare_y2_Values,
  y: compare_xx2Values_graph1,
  type: 'scatter',
  mode: 'lines',
  name:'Comp_Stage_1_Suction_Press_217PI7003',
  line: { color: 'green' }
};





 
 
  return (
    <div className="App">
             {/* <Header /> */}
 
      {/* <div style={{ position: "relative", height: "500px", width: "400px", marginLeft: "500px", marginTop: "40px" }}> */}
             <div style={{ position: "relative", height: "470px", width: "1120px" }}>
 
        {/* <MainContainer style={{ color: "black" }}> */}
 
        <Box sx={{ flexGrow: 1 }}>
           <AppBar position="static" style={{ backgroundColor: "white" }}>
            <Toolbar>
               <IconButton
                 size="large"
                 edge="start"
                 color="inherit"
                 aria-label="menu"
                 sx={{ mr: 2 }}
               >
                 <MenuIcon />
               </IconButton>
               <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ marginLeft: "400px", background: "white", color: "black" }}>
               Intelliguide
               </Typography>
             </Toolbar>
           </AppBar>
        </Box>
 
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="Thinking" /> : null}
                          style={{ backgroundColor: '#008FD50D', color: "#64748B", width: "1120px", marginLeft: "0px" }}
 
            >
             
             <div className='container'>
              <h6 style={{ color: "#64748B" }} className='title'>Today</h6>
             </div>
 
              {/* Render initial message */}
              <div>
              {/* <h1 >👤</h1> */}
              <img src={bot} width={"50px"}  style={{borderRadius:"50%"}}/>
              <Message model={messages[0]} />
              <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"800px" }}>{messages[0].sentTime}</Message.Footer> {/* Display sent time */}
 
              </div>
 
              {
                console.log("Message--->",messages)
              }
 
              {messages.slice(1).map((message, i) => (
 message.error?(
                <div>
                    <Message.Header>{
                    <img src={message.sender === "ChatGPT" ? bot : bot} width={"50px"} style={{borderRadius:"50%"}} />}         
                    </Message.Header>
                    {
                      // console.log("Error message",message.error)
                      message.error.split(" ")[0]==="Answer"?
                      (
                        <div style={{border:"none",backgroundColor:"#c6e3fa",color:"black",width:"500px",borderRadius:"10px",padding:"5px"}}>{message.error}
                      <a href="https://energyeducation.ca/encyclopedia/Power_plant" target='_blank' rel="noopener noreferrer">Please refer this document👉📄</a>
                </div>
                      
      ):<div style={{border:"none",backgroundColor:"#c6e3fa",color:"black",width:"500px",borderRadius:"10px",padding:"5px"}}>
                        {/* {message.error}
                         */}
          <div style={{border:"none",backgroundColor:"#c6e3fa",color:"black",width:"500px",borderRadius:"10px",padding:"5px"}}>{message.error}
                      {/* <a href="https://energyeducation.ca/encyclopedia/Power_plant" target='_blank' rel="noopener noreferrer">Please refer this documnet👉📄</a> */}
            </div>
                      

          </div>
                    }

                                      
                                      <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"600px" }}>{message.sentTime}</Message.Footer>

  </div>
 ):(message.xx1_values_comp1 && message.xx2_values_comp1
&& message.y2_values_comp1  )?(
<div>
                    <Message.Header>{
                    <img src={message.sender === "ChatGPT" ? bot : bot} width={"50px"} style={{borderRadius:"50%"}} />}
                    </Message.Header>
                    
                      <Plot data={[firstFeatureTrace_compare11,lastFeatureTrace_compare22]} layout={{
    width: 1000,
    height:350, // set the width of the plot
    showlegend: true
  }} />
  <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"100px" }}>{message.sentTime}</Message.Footer>
             
                  </div>
):

 (message.x1_comp_values && message.x11_comp_values && message.y1_values_comp)?(
<div>
                    <Message.Header>{
                    <img src={message.sender === "ChatGPT" ? bot : bot} width={"50px"} style={{borderRadius:"50%"}} />}
                    </Message.Header>
                    
                      <Plot data={[firstFeatureTrace_compare1,lastFeatureTrace_compare2]} layout={{
    width: 1000,
    height:350, // set the width of the plot
    showlegend: true
  }} />
  <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"100px" }}>{message.sentTime}</Message.Footer>
             
                  </div>



 ):
//  ("")
  
 
          (message.message && typeof message.message === 'object' && message.message.type === 'img') ?
                (
                  <div>
                  <Message.Header>{
                    <img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{borderRadius:"50%"}} />}
                    </Message.Header>
                  {/* <img key={i} src={message.message.props.src} onClick={handleImageClick} style={{marginLeft:"0px",width:isImageClicked?"900px":"700px",height:isImageClicked?"400px":"300px"}}  height="300px" alt="Image" /> */}

                  {/* <Plot data={data}  /> */}
                  {/* <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"400px" }}>{message.sentTime}</Message.Footer> */}
 
                  </div>
                ):



                (message.x_values_feature && message.x_values_feature)?(

                  <div>
                    <Message.Header>{
                    <img src={message.sender === "ChatGPT" ? bot : ''} width={"50px"} style={{borderRadius:"50%"}} />}
                    </Message.Header>
                    <Plot data={[firstFeatureTrace, lastFeatureTrace]}
                    
                    layout={{
                      height:350, // set the width of the plot
                      showlegend: true
                    }}/>   
                    <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"400px" }}>{message.sentTime}</Message.Footer>
             


                  </div>
                ):
                
                (message.x_values && message.y_values)?( 
                  <div>
                  <Message.Header>{
                    <img src={message.sender === "ChatGPT" ? "": ""} width={"50px"} style={{borderRadius:"50%"}} />}
                    </Message.Header>                 
                <Plot data={datas}
                layout={{
                  width:550,
                  height:330, // set the width of the plot
                  showlegend: true
                }}  />
                <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"400px" }}>{message.sentTime}</Message.Footer>
</div>
                ):(typeof message.message === 'object' && !Array.isArray(message.message)) ?

    <>





    <Message.Header>{
      <img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{borderRadius:"50%"}} />
      // <Plot data={data} layout={layout} />
      }</Message.Header>

  

      <table className='table table-bordered w-50  table-sucess ' style={{border:"2px solid green",color:"#c8dcdf",backgroundColor:"#c8dcdf"}} >
        
        <tbody>
          {
            Object.keys(message.message).map((key)=>(
              
              <tr>
                

                {message.message[key].map((value,index)=>(
                  <td key={index}>{value}</td>
                ))}
              </tr>
    
            ))
          }
          
        </tbody>
      </table>
      <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"550px",marginTop:"-15px" }}>{message.sentTime}</Message.Footer>

      </>
        

               
                : (
                                  <div style={{ display: "flex" }}>
 
                  <Message key={i}  model={{
                                          message: message.message,
                                           sentTime: message.sentTime,
                                           sender: message.sender,
                                           direction: message.sender === "ChatGPT" ? "incoming" : "outgoing",
                                           showAvatar: message.sender !== "ChatGPT",
                                           avatarSrc: message.sender === "ChatGPT" ? bot : userImageQuestion // Set profile picture based on sender
                                         }}
                                         style={{ display: "flex",marginBottom:"35px",width:"1000px" }} >
                                         
                                          <Message.Header>{<img src={message.sender === "ChatGPT" ? bot : userImageQuestion} width={"50px"} style={{borderRadius:"50%"}} />}</Message.Header>
                   <Message.Footer style={{ display: "flex", justifyContent: "end" }}>{message.sentTime}</Message.Footer> {/* Display sent time */}
                   {/* <Message.Footer style={{ display: "flex", justifyContent: "end",marginRight:"400px"  }}>{message.sentTime}</Message.Footer> Display sent time */}
 
                   </Message>
 
                   </div>
                )
              ))}
            </MessageList>
            {/* <MessageInput placeholder="Type message here" onSend={handleSend} /> */}
          </ChatContainer>
          <MessageInput placeholder="Type message here" onSend={handleSend} style={{marginTop:"40px"}}/>

        {/* </MainContainer> */}
      </div>
    </div>
  );
}
 
 
export default Chat