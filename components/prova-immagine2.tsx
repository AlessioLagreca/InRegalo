import React, { useState, forwardRef } from "react";

interface ProvaImmagineProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
	value: string;
	disabled?: boolean;
	name: string;
}

const ProvaImmagine2 = forwardRef<HTMLInputElement, ProvaImmagineProps>(
	({ onChange, onBlur, value, disabled, name }, ref) => {
		const [file, setFile] = useState<File | null>(null);
		const [uploading, setUploading] = useState(false);
		const [uploadedFile, setUploadedFile] = useState(null);

		const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setFile(event.target.files?.[0] || null);
			onChange(event); // Call the original onChange handler
		};

		const handleUpload = async () => {
			if (!file) {
				return;
			}

			setUploading(true);

			const formData = new FormData();
			formData.append("file", file);

			try {
				const response = await fetch("/api/s3-upload", {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					const result = await response.json();
					setUploadedFile(result.fileName);
				} else {
					console.error("Error uploading file:", response.statusText);
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			} finally {
				setUploading(false);
			}
		};

		return (
			<div>
				<input type='file' onChange={handleFileChange} ref={ref} />
				<button onClick={handleUpload} disabled={uploading}>
					{uploading ? "Uploading..." : "Upload"}
				</button>
				{uploadedFile && <p>Uploaded file: {uploadedFile}</p>}
			</div>
		);
	}
);

ProvaImmagine2.displayName = "ProvaImmagine2"; // This is for React DevTools

export default ProvaImmagine2;
