import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import PageComponent from "@/components/Page";
import Component from "@/types/Component";

import { client } from "@/sanity/lib/sanity.client";
import Link from "next/link";

// We use a query parameter 'slug' which we then pass in as a second argument when fetching
const query = groq`*[_type == "page" && slug.current == $slug]{"components": pageBuilder[]}`;

type PageProps = {
  preview: boolean;
  components: Component[];
  headerData: { links: { buttonText: string, url: string }[]; title: string }
  query: string;
  queryParams?: { slug: string };
};

const Page = ({ components, preview, queryParams, headerData }: PageProps) => {
  console.log("here===========")

  console.log({ headerData, links: headerData?.links })
  return (
    <>
      <div className="header-container">
        <Link href="/landing">
          <img
            className="logo"
            src="https://static.storagely.link/public/uploads/logo1291699888124.webp"
            alt="logo"
            data-pagespeed-no-defer=""
          />
        </Link>

        <div style={{
          display: "flex",
          gap: "32px",
          padding: "8px 0",
        }}>
          {headerData?.links?.map(link => (
            <a style={{ color: "#6b6b6b" }} href={link.url}>{link.buttonText}</a>
          ))}
        </div>
      </div>
      <PageComponent
        headerData={headerData}
        components={components}
        preview={preview}
        query={query}
        queryParams={queryParams}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  params,
}) => {
  const queryParams = { slug: params?.slug ?? `` };
  if (preview) {
    return {
      props: { preview, components: [], queryParams },
      revalidate: 300,
    };
  }

  const pageData = await client.fetch(query, queryParams);
  const headerQuery = groq`*[_type == "header"]`;

  const headerDataArr = await client.fetch(headerQuery);

  const headerData = headerDataArr?.length ? headerDataArr[0] : {}

  return {
    props: {
      headerData,
      components: pageData[0]?.components || [],
      preview,
      queryParams: null,
    },
    revalidate: 300,
  };
};

// Prepares Next.js to know which routes already exist and excludes the homepage
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "page" && defined(slug.current) && slug.current != '/'][]{
      "params": { "slug": slug.current }
    }`
  );

  return { paths, fallback: true };
};

export default Page;
