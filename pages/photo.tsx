import Image from "next/image";
import Layout from "../components/Layout";
import BackToMain from "../components/BackToMain";
import { getAllPhotos, Photo } from "../lib/photos";

export default function Photos({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) {
    return (
      <Layout title="Photos">
        <div className="m-10">No Photo</div>
        <BackToMain />
      </Layout>
    );
  } else {
    return (
      <Layout title="Photos">
        <ul className="m-10 flex flex-wrap">
          {photos.map((photo) => (
            <Image
              className="rounded-full"
              key={photo.id}
              src={photo.thumbnailUrl}
              width={200}
              height={200}
              loading="lazy"
              alt={photo.title}
            />
          ))}
        </ul>
        <BackToMain />
      </Layout>
    );
  }
}

export async function getStaticProps() {
  const photos = await getAllPhotos();
  return {
    props: { photos },
    revalidate: 3,
  };
}
