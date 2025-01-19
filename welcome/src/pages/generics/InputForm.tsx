interface ILoginInput { 
  label: string;
  placeholder?: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputForm = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
}: ILoginInput) => (
  <div className="flex flex-col gap-2 ">
    <label className="font-bold">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-6 py-4 rounded-lg border-[1px] border-slate-200"
      required={required}
    />
  </div>
);

export default InputForm;
