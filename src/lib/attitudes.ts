import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const attitudesDirectory = path.join(process.cwd(), "src/pages/attitudes");

export type AttitudeContent = {
  readonly title: string;
  readonly description: string;
  readonly slug: string;
  readonly arguments: ArgumentContent[];
};

export type ArgumentContent = {
  readonly title: string;
  readonly slug: string;
  readonly rebuttals: string[];
};

function fetchArgumentContent(slug: string): ArgumentContent {
  const filename = slug + '.mdx';
  const fullPath = path.join('src/pages/arguments', filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  const matterData = matterResult.data as {
    title: string;
    slug: string;
    rebuttals: string[];
  };
  return matterData;
}

let attitudeCache: AttitudeContent[];

function fetchAttitudeContent(): AttitudeContent[] {
  /*if (attitudeCache) {
    return attitudeCache;
  }*/
  // Get file names under /posts
  const fileNames = fs.readdirSync(attitudesDirectory);
  const allAttitudesData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(attitudesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        title: string;
        description: string;
        slug: string;
        arguments: string[];
      };
      const slug = fileName.replace(/\.mdx$/, "");

      let argumentContents = matterData.arguments.map((argument) => {
        return fetchArgumentContent(argument);
      })
      console.log('contents', argumentContents);

      const attitudeData = {
        title: matterData.title,
        description: matterData.description,
        slug: matterData.slug,
        arguments: argumentContents
      }

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }
      return attitudeData;
    });
  attitudeCache = allAttitudesData;
  return attitudeCache;
}

export function countAttitudes(): number {
  return fetchAttitudeContent().length;
}

export function listAttitudeContent(
  page: number,
  limit: number,
): AttitudeContent[] {
  return fetchAttitudeContent()
    .slice((page - 1) * limit, page * limit);
}
