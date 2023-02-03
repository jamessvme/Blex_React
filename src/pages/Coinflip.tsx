import { MainWindows, User } from "../App";
import { Coinflip } from "../components/Coinflip/Coinflip";
interface CoinflipProps {
    user: User | null;
  }
  
export default function ({ user }: CoinflipProps) {

    return (
        <div className="w-96 sm:w-[74%] mx-auto">
            <Coinflip 
                user={user}
            />
        </div>
    )
}