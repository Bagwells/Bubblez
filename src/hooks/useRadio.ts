
import { useState } from "react";


export const useRadio =()=> {
    const architecture = ['Residential', 'Commercial', 'Post-Construction', 'Specialty'];
    const [selected, setSelected] = useState<string>(architecture[0])
    return {architecture, selected, setSelected}
}