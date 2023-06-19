import React from "react";
export interface NumberInputProps {
  name: string;
  value: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxValue: number;
}
export const NumberInput: React.FC<NumberInputProps> = ({
  name,
  handleChange,
  maxValue,
  value,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1 ">
      <label htmlFor={name} className="">
        {name}
      </label>

      <input
        type="number"
        name={name}
        value={value}
        onChange={handleChange}
        max={maxValue}
        className="rounded-lg border p-1 focus:scale-125 transition-transform"
      />
    </div>
  );
};
