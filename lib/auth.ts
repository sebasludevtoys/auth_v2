

import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse,NextApiHandler } from 'next'
import { unstable_getServerSession } from "next-auth/next"

import {prisma} from './prisma'


interface Handler extends NextApiHandler {
    user:{}
}

export const validateRouteHandler = (handler:any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TEST_TOKEN

    if (token) {
      let user

      try {
         // @ts-ignore:next-line
        const { id } = jwt.verify(token, process.env.SECRET)
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorizied' })
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not Authorizied' })
  }
}