import {BsFillLightningChargeFill} from "react-icons/bs";
import {MdOutlineMessage} from "react-icons/md";

const NavbarHead = ({children}) => {
    return (
        <div className='flex flex-col gap-3.5'>
            {children}
            <div className='flex flex-row gap-1 items-center text-zinc-500 text-sm'>
                <BsFillLightningChargeFill/> Following
            </div>
            <div className='flex flex-row gap-1 items-center text-zinc-500 text-sm'>
                <MdOutlineMessage/> Threads
            </div>
        </div>
    );
};

export default NavbarHead;
