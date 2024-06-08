import React from "react";

interface ContainerProps {
	children: React.ReactNode;
	extraClasses?: string;
}

const Container: React.FC<ContainerProps> = ({ children, extraClasses = "" }) => {
	return <div className={`min-h-screen flex flex-col items-center ${extraClasses}`}>{children}</div>;
};

export default Container;
