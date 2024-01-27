// Task 1: App Component

// Task 2: Create Writing Area

// Task 3: Create Dropdown Actions

// Task 4: Style Using CSS

// Task 14: Define App States

// Task 15: Add Event Handlers

// Task 16: Integrate UI & OpenAI API
import { SetStateAction, useState } from 'react'
import styles from './app.module.css'
import getResult from '../../services/ApiWrapper'
export default function App() {
    const [tone, setTone] = useState('funny')
    const [style, setStyle] = useState('summarize')
    const [writing, setWriting] = useState('')
    const [response, setResponse] = useState('')
    const TYPE = {
        TONE: 'tone',
        STYLE: 'style'
    }

    const getToneValue = async()=> {
        getResult({content:writing, type:TYPE.TONE , context:tone}).then((res: string)=>{setResponse(res)});
    }

    const getStyleValue = async()=> {
        getResult({content:writing, type:TYPE.STYLE , context:style}).then((res: string)=>{setResponse(res)});
    }

    return (
        <div>
        <select className={styles.tone_change} name='tone' id='tone' onChange={(e)=>{setTone(e.target.value)}}>
        <option value='funny'>Funny</option>
        <option value='professional'>Professional</option>
        <option value='casual'>Casual</option>
        </select>
        <button id='style_btn' className={styles.submit_button_tone} onClick={()=>getToneValue()} >Change Tone</button>

        <select name='style' id='style' className={styles.style_change} onChange={(e) => {setStyle(e.target.value)}}>
        <option value='summarize'>Summarize</option>
        <option value='vocab'>Vocab</option>
        <option value='improve'>Improve</option>
        </select>
        <button id='action_btn' className={styles.submit_button_action} onClick={()=>getStyleValue()}>Take action</button>

        <div className={styles.writing_area}><textarea id='writing' name='writing_space' placeholder="Write you content here..." onChange={(e) => {setWriting(e.target.value)}} /></div>
        <div className={styles.response_area}> <textarea id='response' name='response_space' placeholder="AI Response" onChange={(e) => {setResponse(e.target.value)}} value={response} readOnly /></div>
        
    </div>
    )
}