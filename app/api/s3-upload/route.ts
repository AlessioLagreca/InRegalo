import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Creiamo il client S3
const s3client = new S3Client({
	region: process.env.AWS_S3_REGION || "eu-north-1",
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
		secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
	},
});

export async function POST(request: Request) {
	if (request.method !== "POST") {
		return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
	}
	if (!request.body) {
		return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
	}

	const formData = await request.formData();
	const file = formData.get("file");
	if (!(file instanceof File)) {
		return new NextResponse("Invalid file uploaded", { status: 400 });
	}

	const fileName = encodeURIComponent(file.name);
	console.log(fileName);
	const fileType = file.type;

	// concateniamo insieme i parametri per ottenere l'url
	const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;

	try {
		const arrayBuffer = await file.arrayBuffer();
		const fileBuffer = Buffer.from(arrayBuffer);

		const command = new PutObjectCommand({
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: fileName,
			Body: fileBuffer,
			ContentType: fileType,
		});

		await s3client.send(command);

		return NextResponse.json({ success: true, url });
	} catch (error) {
		return NextResponse.json({ error: "Error uploading file to S3" });
	}
}
