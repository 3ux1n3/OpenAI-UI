import { useState } from 'react'
import './App.css'
import { Configuration, OpenAIApi } from "openai"

function App() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState("")

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openaiClient = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openaiClient.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
        }
    )

    // @ts-ignore
    setResult(res.data.data[0].url)
  }

  return (
    <div className="app-main">
      <h3>Generate an image using OpenAI API</h3>
      <input className="app-input"
             type="text"
             onChange={(e) => setPrompt(e.target.value)}
             placeholder="Type your prompt here"
      />
      <button onClick={generateImage}>Generate an Image</button>
      <img className="result-image" src={result} alt={prompt}/>
    </div>
  )
}

export default App
