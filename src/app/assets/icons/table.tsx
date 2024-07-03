import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const IconTable = ({ ...props }: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 21 21">
      <path
        d="M7.5 3.5V17.317M17.5 7.5H3.5M17.498 15.498L17.488 5.498C17.4875 4.96791 17.2765 4.45972 16.9015 4.08508C16.5265 3.71044 16.0181 3.5 15.488 3.5H5.488C4.98342 3.49984 4.49743 3.69041 4.12745 4.0335C3.75747 4.37659 3.53084 4.84684 3.493 5.35L3.487 5.502L3.497 15.502C3.49753 16.0321 3.70848 16.5403 4.08349 16.9149C4.45851 17.2896 4.96691 17.5 5.497 17.5H15.497C16.0016 17.5002 16.4876 17.3096 16.8575 16.9665C17.2275 16.6234 17.4542 16.1532 17.492 15.65L17.498 15.498Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeWidth={1.5}
      />
    </SvgIcon>
  );
};
