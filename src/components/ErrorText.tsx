export const ErrorText = ({ message }: { message: unknown }) => {
  return typeof message === "string" ? (
    <p className="text-red-500 text-sm">{message}</p>
  ) : null;
};
