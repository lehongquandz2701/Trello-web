import { useMemo } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IconButton } from "@mui/material";
import { useDisclose } from "~/hooks";
type TextInputProps = {
  label: string;
} & UseControllerProps<any>;

function TextInput({ label, control, name, ...rest }: TextInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    ...rest,
  });

  const showPassword = useDisclose(false);

  const iconPassword = useMemo(() => {
    if (name === "password") {
      if (showPassword.isOpen)
        return (
          <div className=" text-gray-400 gap-2 flex ">
            <IconButton
              className="h-[25px] w-[25px]"
              onClick={showPassword.onToggle}
            >
              <VisibilityOffOutlinedIcon className=" text-gray-400" />
            </IconButton>
            <span className="text-[14px]">Hide</span>
          </div>
        );

      return (
        <div className=" text-gray-400  gap-2 flex">
          <IconButton
            className="h-[25px] w-[25px]"
            onClick={showPassword.onToggle}
          >
            <VisibilityOutlinedIcon className=" text-gray-400" />
          </IconButton>
          <span className="text-[14px]">Show</span>
        </div>
      );
    }
    return <></>;
  }, [showPassword.isOpen]);

  return (
    <div className="mb-4">
      <div className="flex justify-between w-full">
        <label className="block mb-1 text-sm text-gray-600">{label}</label>
        {iconPassword}
      </div>

      <input
        type={showPassword.isOpen ? "password" : "text"}
        {...field}
        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-black ${
          error ? "border-red-500" : "border-gray-300"
        } ${field.value ? "text-black" : "text-gray-400"}`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}

export default TextInput;
