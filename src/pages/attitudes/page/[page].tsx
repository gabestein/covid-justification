import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import AttitudeList from "../../../components/AttitudeList";
import config from "../../../lib/config";
import { countAttitudes, listAttitudeContent, AttitudeContent } from "../../../lib/attitudes";

type Props = {
  attitudes: AttitudeContent[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Page({ attitudes, pagination, page }: Props) {
  const url = `/attitudes/page/${page}`;
  const title = "All attitudes";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <AttitudeList attitudes={attitudes} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string);
  const attitudes = listAttitudeContent(page, config.posts_per_page);
  const pagination = {
    current: page,
    pages: Math.ceil(countAttitudes() / config.posts_per_page),
  };
  return {
    props: {
      page,
      attitudes,
      pagination,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countAttitudes() / config.posts_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
