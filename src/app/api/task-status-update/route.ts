import { type NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

interface RequestBody {
  statusId: number;
  id: string;
}

interface ErrorInterface {
  message: string;
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerAuthSession();
    const { statusId, id } = (await request.json()) as RequestBody;
    if (!session?.user?.id) {
      throw new Error("User is not authenticated")
    }

    if (!statusId || !id) {
      throw new Error("Task Status is required")

    }
    if (statusId > 3 || statusId < 1) {
      throw new Error("Status is not valid")
    }

    await db.task.update({
      data: { status: statusId },
      where: { id: id, userId: session.user.id },
    });

    return NextResponse.json({ message: "Successfully updated status" });
  } catch (error) {
    const Error: ErrorInterface = {
      message: (error as Error).message || "Internal Server Error",
    };
    console.error("Error while updating Task status:", error);

    return NextResponse.json({ error: Error.message });
  }
}
