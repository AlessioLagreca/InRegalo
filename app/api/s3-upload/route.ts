import { NextResponse } from "next/server";
import { S3Client, PutObjectAclCommand } from "@aws-sdk/client-s3";

const s3client = new S3Client({
	region: "",
	credentials: {
		accessKeyId: "",
		secretAccessKey: "",
	},
});

export async function POST() {
	return NextResponse.json({ msg: "Hello API!" });
}
