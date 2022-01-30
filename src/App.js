import logo from './play.svg'
import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");



function App() {

  const [Code, setCode] = useState("");

  const [Input, setInput] = useState("");

  const [Output, setOutput] = useState("Run to c output");

  const [FileType, setFileType] = useState("c");

  const [FontSize, setFontSize] = useState(18);

  const runcode = (e) => {
    e.preventDefault();
    socket.emit("Compiler", {
      socketId: socket.id,
      code: Code,
      input: Input,
      output: "",
      extention: FileType
    })
  }
  useEffect(() => {
    socket.on("Compiler", (payload) => {
      setOutput(payload.output);
    })
  })
  return (
    <div className="App">
      <div className='code'>
        <div className='top'>
          <div className='Logo'>Online Compiler</div>
          <button className='runbtn' onClick={runcode}>Run<img src={logo} alt="" /></button>
        </div>
        <div className='Select'>
          <div className='Heading'>Source Code</div>
          <div className='optn'>
            <div className='FontSizeLang space'>
              <span className='Fntsizelogo'>Font Size</span>
              <select className='seloptn' onChange={(e) => setFontSize(parseInt(e.target.value))} value={FontSize}>
                <option value="18">18</option>
                <option value="22">22</option>
                <option value="26">26</option>
                <option value="30">30</option>
              </select>
            </div>
            <div className='FontSizeLang' >
              <span className='Fntsizelogo'>Language</span>
              <select className='seloptn' onChange={(e) => setFileType(e.target.value)} value={FileType}>
                <option>c</option>
                <option>cpp</option>
                {/* <option>java</option> */}
                <option>py</option>
              </select>
            </div>
          </div>
        </div>
        <div className='codeArea'>
          <textarea className='note' style={{ fontSize: FontSize }} onChange={(e) => setCode(e.target.value)} value={Code} />
        </div>
      </div>
      <div className='inpout'>
        <div className='input'>
        <div className='Select'>
            <div className='Heading'>Input Pannel</div>
          </div>
          <div className='inputSection'>
            <textarea onChange={(e) => setInput(e.target.value)} value={Input} />
          </div>
        </div>
        <div className='output'>
          <div className='Select'>
            <div className='Heading'>Output Pannel</div>
          </div>
          <div className='outputSection'>
            <textarea style={{ color: "white" }} disabled={true} value={Output} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;