import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import AttitudeList from "../../components/AttitudeList";
import config from "../../lib/config";
import { countAttitudes, listAttitudeContent, AttitudeContent } from "../../lib/attitudes";
import Head from "next/head";

type Props = {
  attitudes: AttitudeContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ attitudes, pagination }: Props) {
  const url = "/attitudes";
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

export const getStaticProps: GetStaticProps = async () => {
  const attitudes = listAttitudeContent(1, config.posts_per_page);
  const pagination = {
    current: 1,
    pages: Math.ceil(countAttitudes() / config.posts_per_page),
  };
  return {
    props: {
      attitudes,
      pagination,
    },
  };
};
