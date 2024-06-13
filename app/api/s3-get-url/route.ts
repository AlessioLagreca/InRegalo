import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetFileProps {
	url: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GetFileProps>
) {
	const s3client = new S3Client({
		region: process.env.AWS_S3_REGION!,
		credentials: {
			accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
			secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
		},
	});

	const command = new GetObjectCommand({
		Bucket: process.env.AWS_S3_BUCKET_NAME!,
		Key: req.query.path as string,
	});

	const url = await getSignedUrl(s3client, command, { expiresIn: 900 });
	res.status(200).json({ url });
}
