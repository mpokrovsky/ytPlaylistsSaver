// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getLinks } from "../../utils/getLinks";

interface Link {
  href: string;
  title: string;
}

type Data = {
  name: string;
  data: Link[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let url = JSON.parse(req.body).url;

  const { name, links } = await getLinks(url);
  res.status(200).json({ name, data: links });
}
