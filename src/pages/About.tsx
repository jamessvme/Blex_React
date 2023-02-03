
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function () {
    return (
        <div className="w-full font-['Rubik_Mono_One'] overflow-y-auto h-[695px] pb-3">
            <div className="font-normal font-['Rubik_Mono_One'] flex items-end mt-[70px] justify-center uppercase text-[#9877FE]  text-[36px] leading-7 text-center">
                ABOUT US & Faq
                <img src="/img/people-fill.png" className='mx-5' alt="fa User" />
            </div>
            <div className='pb-3'>
                <div className='mt-14'>
                    <h1 className="font-['Rubik_Mono_One'] font-normal text-[40px] leading-[50px] text-white text-center">what's bloxbet?</h1>
                    <p className="font-['Noto_Music'] font-normal text-base leading-7 text-white pb-16 text-center">BloxBet is a roblox gambling site where you can gamble away your limiteds!
                    </p>
                </div>
                <div className='grid grid-cols-1 mt-5  xl:grid-cols-2 px-[10%] gap-12 overflow-y-auto h-[calc(280px)] mr-4 '>
                    <div className='article '>
                        <h1>What is my .ROBLOSECURITY used for?</h1>
                        <p>
                            In order to automate all trades and for our website to function, we use your session token (.ROBLOSECURITY). 
                            Our bots do everything in real time, and ensures a trust-less system between all users.
                            Are my cookies safe? Absolutely! We don't store any .ROBLOSECURITY tokens in our database.
                        </p>
                    </div>
                    <div className='article '>
                        <h1>What is a "Projected" item? </h1>
                        <p>
                            Projected items are items in which someone purchases typically a low demand 
                            cheap item for an extremely high price, temporarily raising its RAP to an inflated false amount.
                            We disable betting projected items as it's unfair to users that they're risking their real value items, against an inflated fake RAP item.
                            Projected's are only an issue with unvalued items as we use Roblox's RAP metric to gauge their worth.
                        </p>
                    </div>
                    <div className='article '>
                        <h1>How do I deposit limiteds? </h1>
                        <p>
                        hover over the deposit button and deposit all you want! 
                        </p>
                    </div>
                    <div className='article '>
                        <h1>I didn't get my items what do I do? </h1>
                        <p>
                            Check blxbet.com/claims , any glitched or failed attempts to send you your items will be available there for you to claim. 
                            For manual support please join our Discord supprt server https://discord.gg/Bloxbet
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}