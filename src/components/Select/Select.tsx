import Select from 'react-select';
import {useState} from "react";
const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
    <label>
        <input type="checkbox" {...props} />
        {children}
    </label>
);

const braceletsize =[
    "17cm",
    "18cm",
    "19cm",
    "20cm",
    "21cm",
    "22cm",
]

export default () => {
    const [sizeSelect, setSizeSelect]= useState("");

    const handleSelectChange = (selectedOption) => {
        setSizeSelect(selectedOption.value);
        console.log(`Option selected:`, selectedOption);
    };

    return (
        <>
            <label htmlFor={"select-size-bracelet"}>Taille tour de poignet</label>
            <Select
                id={"select-size-bracelet"}
                className="basic-single"
                classNamePrefix="select"
                defaultValue={braceletsize[0]}
                name="color"
                options={braceletsize.map((size) => ({ value: size, label: size }))}
                onChange={handleSelectChange}
            />

            <div
                style={{
                    color: 'hsl(0, 0%, 40%)',
                    display: 'inline-block',
                    fontSize: 12,
                    fontStyle: 'italic',
                }}
            >
            </div>
        </>
    );
};
