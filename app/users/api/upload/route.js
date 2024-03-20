// import { writeFile } from "fs";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const data = await req.formData();
//   const file = data.get("file");
//   if (!file) {
//     return NextResponse.json({ message: "No Image Found", success: false });
//   }
//   const byteData = await file.arrayBuffer();
//   const buffer = Buffer.from(byteData);
//   const path = `./public/${file.name}`;
//   await writeFile(path, buffer);
//   return NextResponse.json({ message: "File Uploaded", success: true });
// }
