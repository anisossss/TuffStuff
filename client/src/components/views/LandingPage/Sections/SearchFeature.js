import React, { useState, useEffect} from 'react'
import { Input } from 'antd';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import { GrPowerReset } from 'react-icons/gr'
import { FiMicOff } from 'react-icons/fi'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const { Search } = Input;
SpeechRecognition.startListening({ continuous: false })
SpeechRecognition.startListening({ language: 'en-US' })



function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const { transcript, resetTranscript } = useSpeechRecognition()

    useEffect(() => {
        setSearchTerms(transcript)
        props.refreshFunction(transcript)
      }, [transcript])

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log("Browser does not support!")
        return null
      }

    
    

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)
        
        props.refreshFunction(event.currentTarget.value)

    }



    return (
        <div>
            <Search
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Search"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem auto' }}>
                <button onClick={SpeechRecognition.startListening}>Start <FaMicrophone /></button>
                <button onClick={SpeechRecognition.stopListening}>Stop <FiMicOff /></button>
                <button onClick={resetTranscript}>Reset <GrPowerReset/> </button>
            </div>
            
        </div>
    )
}

export default SearchFeature
