"use client";

import React, { forwardRef, useState } from "react";

interface ProvaImmagineProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
	value: string;
	disabled?: boolean;
	name: string;
}

const ImageUploader = ({ onChange, disabled }: ProvaImmagineProps) => {
	return (
		<div>
			<input type='file' onChange={onChange} disabled={disabled} />
		</div>
	);
};

export default ImageUploader;
