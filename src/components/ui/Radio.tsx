
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { FaCheck } from 'react-icons/fa6';


export function RadioButton({selected, setSelected, data}:{selected:string; setSelected:(val:string)=> void; data:string[]}) {

  return (
    <RadioGroup value={selected} onChange={setSelected} aria-label="Apartment type" className="flex w-full flex-wrap justify-between gap-2">
      {data.map((plan) => (
        <Field key={plan} className="flex items-center gap-2 font-work">
          <Radio
            value={plan}
            className="group flex size-5 items-center justify-center rounded-full bg-neutral-200 data-checked:bg-black data-disabled:bg-gray-100"
          >
            <FaCheck className="invisible w-full rounded-full bg-black text-white p-0.5 group-data-checked:visible" />
          </Radio>
          <Label className="font-normal text-sm data-disabled:opacity-50">{plan}</Label>
        </Field>
      ))}
    </RadioGroup>
  )
}