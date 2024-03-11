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
      throw new Error("User is not authenticated")
    }

    if (!Title || !Description) {
      throw new Error("Title,Description is required")
    }

    await db.task.create({data: { title: Title, description: Description,userId:session?.user?.id}});

    return NextResponse.json({ message: "Successfully created" });
  } catch (error) {
    const Error: ErrorInterface = {message: (error as Error).message || "Internal Server Error"};
    console.error("Error while creating Task:", error);
    return NextResponse.json({ error: Error.message});

  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerAuthSession();
    const { Title, Description,Id } = (await request.json()) as RequestBody;
    if (!session?.user?.id) {
      throw new Error("User is not authenticated")
    }

    if (!Title || !Description || !Id) {
      throw new Error("Title,Description Task is required")
    }
    

    await db.task.update({data: { title: Title, description: Description},where: { id: Id,userId:session.user.id}});

    return NextResponse.json({ message: "Successfully updated" });
  } catch (error) {
    const Error: ErrorInterface = {message: (error as Error).message || "Internal Server Error"};
    console.error("Error while updating Task:", error);

    return NextResponse.json({ error: Error.message});

  }
}

export async function DELETE(request: NextRequest) {
  try {
  const session = await getServerAuthSession();
  const url = new URL(request.url)
  const id = url.searchParams.get("id")

    if (!session?.user?.id) {
      throw new Error("User is not authenticated")
    }

    if (!id) {
      throw new Error("Task is required")

    }
    await db.task.delete({where: { id:id}});

    return NextResponse.json({ message: "Successfully deleted" });
  } catch (error) {
    const Error: ErrorInterface = {message: (error as Error).message || "Internal Server Error"};
    console.error("Error while Deleting Task:", error);

    return NextResponse.json({ error: Error.message});

  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerAuthSession();

    if (!session?.user?.id) {
      throw new Error("User is not authenticated")
    }
    
    const url = new URL(request.url)  
    const status =url.searchParams.get("statusId")
    const title=url.searchParams.get("title")

    const filter = {
      userId: session.user.id,
      ...(status!==null && parseInt(status) > 0 && parseInt(status) <= 3 && { status: parseInt(status) }),
      ...(title!==null && title.trim() !== '' && { title: { contains: title } }),
    };
    
    const tasks = await db.task.findMany({
      where: filter,
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error while fetching tasks:", error);
    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}
