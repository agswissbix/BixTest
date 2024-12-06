'use client';
import { Select, Option } from "@material-tailwind/react";
 
export default function SelectDefault() {
  return (
    <div className="w-72">
      <Select label="Select Version" placeholder="Select an option" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>
  );
}