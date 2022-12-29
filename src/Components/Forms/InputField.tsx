interface Props{
    value?: any;
    name?: string;
    type?: string;
    placeholder?: string;
    autoFocus?: boolean;
    validations?: any;
}

export const InputField = ({...props}: Props) => {
    //const[ field ] = useField(props)
    // console.log(field);

    return (
        <div className="relative w-full mb-3">
        <>
            <input {...props} />
            
        </>
        </div>
    )

}


/*
const fixedInputClass =
  "border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ring-gray-300"

interface Props{
    value: any;
    name: string;
    type: string;
    placeholder: string;
    autoFocus?: boolean;
    validations: any;
}

export const InputField = ({...props}: Props) => {
    //const[ field ] = useField(props)
    // console.log(field);

    return (
        <div className="relative w-full mb-3">
        <>
            <input className={fixedInputClass} {...props} />
            
        </>
        </div>
    )

}*/