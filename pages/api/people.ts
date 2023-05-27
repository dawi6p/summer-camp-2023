import type { NextApiRequest, NextApiResponse } from "next";
import {faker} from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  title: string;
  role: string;
};

/**
 * TODO: Prepare an endpoint to return a list of users
 * User faker.js or similar library to generate fake data, the minimal number of users is 100
 * The endpoint should return a pagination of 10 users per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  faker.seed(1234)
  const users = [...new Array(105)].map(() => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      title: faker.person.jobTitle(),
      role: faker.person.jobType(),
    }
  })
  const pageCount = 10;
  const page = req.query.page;

  var p = 1;

  if (typeof page === 'string') {
    p = parseInt(page, 10);
  }

  if(p == undefined || p == null || Number.isNaN(p) || p < 1) p = 1;
  if(p > users.length/pageCount)
  {
    p = Math.floor(users.length/pageCount);
    if(users.length%pageCount != 0) p+=1;
  }

  res.status(200).json(users.slice(pageCount*(p-1), pageCount*p));
}
