import React from "react";
import { Link, LinkProps } from "react-router-dom";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonPropsBase {
    variant?: ButtonVariant;
    children: React.ReactNode;
    className?: string;
}

type ButtonAsButton = ButtonPropsBase & React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsLink = ButtonPropsBase & LinkProps & { as: typeof Link };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, as, ...props }) => {
    const Component: any = as || "button";
    const className = ["btn-" + variant, (props as any).className]
        .filter(Boolean)
        .join(" ");

    return (
        <Component {...props} className={'btn ' + className}>
            {children}
        </Component>
    );
};

export default Button;
