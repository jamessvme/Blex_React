
interface ChatControlProps {
    setChatShow: Function,
    showChat: Boolean
}

export default function( { setChatShow, showChat}: ChatControlProps) {
    
    if ( showChat) {
        return (
            <button 
                onClick={() => setChatShow(false)}
                className="btnShowChat absolute top-1/3 left-[0px] z-30"
                >
                <img src="/img/vector_left.png" />
            </button>
        )
    }
    else {
        return (
            <div>
                <button 
                onClick={() => setChatShow(true)}
                className="btnShowChat absolute top-1/3 left-[0px] z-30"
                >
                 <img src="/img/vector.png" />   
                </button>
            </div>
        )
    }
    
}