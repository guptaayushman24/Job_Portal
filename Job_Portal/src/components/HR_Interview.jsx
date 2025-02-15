import VoiceRecorder from "./Voice_Record";
import './HR_Interview.css'
const HRInterview=()=>{
    return (
      <div className="parent">
      <div className="heading">
        <h2>Prepare for the HR Interview with AI</h2>
      </div>

       <div className="interviewdivparent">
       <div className="interviewdiv">
          Press on the microphone icon and start giving your answer and after  completion press on the stop button
        </div>
       </div>
        <div>
        <VoiceRecorder></VoiceRecorder>
       </div>
      </div>
    )
}
export default HRInterview
