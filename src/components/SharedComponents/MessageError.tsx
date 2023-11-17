interface Props {
  errorMessage?: string;
}

const MessageError = ({ errorMessage }: Props) => {
  return (
    <div className="h-[0.9rem] transition-opacity ease-in-out duration-300 text-[12px]">
      <p
        className={`text-red-400  pt-1 ${
          errorMessage ? "opacity-100" : "opacity-0"
        }`}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default MessageError;
