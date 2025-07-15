import type { ReactNode } from "react";

type CardProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
};

export default function Card({ title, icon, children, footer, selected, onClick }: CardProps) {
  return (
    <div
      className={`cursor-pointer border-2 p-6 rounded-lg shadow-md transition duration-300
        ${selected ? 'border-green-500' : 'border-gray-800'}
        hover:scale-105 hover:shadow-lg`}
      onClick={onClick}>

      <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
      
      <div className="flex justify-center text-5xl mb-4">{icon}</div>
      
      <div className="text-center mb-4">
        {children}
      </div>
      
      {footer && <div className="text-center mt-4">{footer}</div>}
    </div>
  );
}
