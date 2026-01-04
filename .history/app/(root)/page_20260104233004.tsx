import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getUserImages } from "@/lib/actions/image.actions";
import { auth } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

const Home = async ({ searchParams }: SearchParamProps) => {
  // 🚫 VERY IMPORTANT: disable cache for user data
  noStore();

  // 🔐 get logged-in user
  const { userId } = auth();

  // if logged out, show no collection
  if (!userId) {
    return (
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>
      </section>
    );
  }

  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  // ✅ USER-SCOPED FETCH
  const images = await getUserImages({
    userId,
    page,
    searchQuery,
  });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>

        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={24}
                  height={24}
                />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images.data}
          totalPages={images.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
