import { AttitudeContent } from "../lib/attitudes";
import Link from "next/link";

type Props = {
  attitude: AttitudeContent;
};
export default function AttitudeItem({ attitude }: Props) {
  return (
    <Link href={"/attitudes/" + attitude.slug}>
      <a>
        <h2>{attitude.title}</h2>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
            }
            h2 {
              margin: 0;
              font-weight: 500;
            }
          `}
        </style>
      </a>
    </Link>
  );
}
