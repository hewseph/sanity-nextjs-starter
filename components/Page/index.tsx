import PageComponents from "@/components/PageComponents";
import Component from "@/types/Component";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import Link from "next/link";

const PagePreview = lazy(() => import("@/components/PagePreview"));

type PageProps = {
  preview: boolean;
  components: Component[];
  headerData: { links: { buttonText: string, url: string }[]; title: string }
  query: string;
  queryParams?: { slug: string };
};

const Page = ({ preview, components, query, queryParams, headerData }: PageProps) => {
  console.log({ preview, components, query, queryParams, headerData })
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PagePreview query={query} queryParams={queryParams} />
    </PreviewSuspense>
  ) : (
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
      <PageComponents components={components} />
    </>
  );
};

export default Page;
