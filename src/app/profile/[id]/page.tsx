import { EditProfile } from "../_components/edit-profile";
import { ProfileAvatar } from "@/app/profile/_components/profile-avatar";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    id: string;
  };
}

const prisma = new PrismaClient();

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        userName: true,
        picture: true,
        email: true,
        role: true,
      },
    });

    if (!user) return notFound();

    return (
      <section
        key={id}
        className="border border-zinc-600 max-w-5xl mx-auto rounded-xl p-5 space-y-5"
      >
        {/* AVATAR */}
        <div className="relative w-60">
          <ProfileAvatar
            userId={id}
            initialPicture={user?.picture || null}
            roll={user.role}
          />
        </div>

        {/* INPUTS */}
        <EditProfile user={user} />
      </section>
    );
  } catch (error) {
    console.error("Erro profile", error);
    return <div>Alguma coisa dei errado, tente novamente mais tarde</div>;
  }
}
