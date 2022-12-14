import { ErrorMessage, useField } from "formik";
const fixedInputClass =
  "border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ring-gray-300"

interface Props{
    label: any;
    labelFor: any;
    id: any;
    name: any;
    type: any;
    placeholder: any;
    customClass: any;
    value: any;
}


export const MyTextIntput = ({label, labelFor, customClass, ...props}: Props) => {
    const[ field ] = useField(props)
    // console.log(field);

    return (
        <div className="relative w-full mb-3">
        <>
            <label htmlFor={labelFor} className="sr-only">{label}</label>
            <input className={fixedInputClass + customClass} autoFocus= {false} style={{ transition: "all .15s ease" }} {...field} {...props} />
            <ErrorMessage name={props.name} component="span" className="ml-2 text-sm font-semibold text-red-500"/>
        </>
        </div>
    )

}