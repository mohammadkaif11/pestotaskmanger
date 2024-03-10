import { type NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

interface RequestBody {
  Title: string;
  Description: string;
  Id?: string;
}
interface ErrorInterface {
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerAuthSession();
    const { Title, Description } = (await request.json()) as RequestBody;
    if (!session?.user?.id) {
      return NextResponse.json({ message: "User is not authenticated" });
    }

    if (!Title || !Description) {
      return NextResponse.json({ message: "Title,Description is required" });
    }
    await db.task.create({data: { title: Title, description: Description,userId:session?.user?.id}});

    return NextResponse.json({ message: "Successfully created" });
  } catch (error) {
    const Error: ErrorInterface = {message: (error as Error).message || "Internal Server Error"};
    console.error("Error while creating Task:", error);

    return NextResponse.json({ message: Error.message});

  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerAuthSession();
    const { Title, Description,Id } = (await request.json()) as RequestBody;
    if (!session?.user?.id) {
      return NextResponse.json({ message: "User is not authenticated" });
    }

    if (!Title || !Description || !Id) {
      return NextResponse.json({ message: "Title,Description Task is required" });
    }
    

    await db.task.update({data: { title: Title, description: Description},where: { id: Id,userId:session.user.id}});

    return NextResponse.json({ message: "Successfully updated" });
  } catch (error) {
    const Error: ErrorInterface = {message: (error as Error).message || "Internal Server Error"};
    console.error("Error while updating Task:", error);

    return NextResponse.json({ message: Error.message});

  }
}

export async function DELETE(request: NextRequest) {
  try {
  const session = await getServerAuthSession();
  const url = new URL(request.url)
  const id = url.searchParams.get("id")

    if (!session?.user?.id) {
      return NextResponse.json({ message: "User is not authenticated" });
    }

    if (!id) {
      return NextResponse.json({ message: "Id is required" });
    }
    await db.task.delete({where: { id:id}});

    return NextResponse.json({ message: "Successfully deleted" });
  } catch (error) {
    const Error: ErrorInterface = {message: (error as Error).message || "Internal Server Error"};
    console.error("Error while Deleting Task:", error);

    return NextResponse.json({ message: Error.message});

  }
}