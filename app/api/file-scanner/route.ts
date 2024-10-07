import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
const VirusTotalApi = require("virustotal-api");

const vt = new VirusTotalApi(process.env.VIRUS_TOTAL_API_KEY); // Replace with your actual API key

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const buffer = await file.arrayBuffer();
  const filePath = path.join(process.cwd(), "temp", file.name);

  // Write the file temporarily to disk
  fs.writeFileSync(filePath, Buffer.from(buffer));

  try {
    // Scan the file using VirusTotal
    const scanResult = await vt.fileScan(filePath);

    // Retrieve the report after scanning
    const report = await vt.fileReport(scanResult.resource);

    // Check if the file is safe
    const isSafe = report.positives === 0;

    return NextResponse.json({ scanResult, isSafe });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error scanning the file" }, { status: 500 });
  } finally {
    // Clean up the temporary file
    fs.unlinkSync(filePath);
  }
}
