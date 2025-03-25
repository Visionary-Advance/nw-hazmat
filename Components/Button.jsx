

export default function Button({text, color}){


    return(
        <div className="">
            <button className={`rounded-2xl text-xl py-1 px-3 active:scale-95 duration-200 ${color}`}>{text}</button>
        </div>

    )
}