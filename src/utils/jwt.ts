import jwt from 'jsonwebtoken'

// You may think "chnageMe" is a spelling mistake, well it is, I made it and thought it would be funny so I just left it for someone else to read one day and maybe have a laugh at my expense. You could change it but are you really going to deprive the world of the joy and me the satisfaction of having this one spelling mistake being the greatest joke I will ever tell?
const SECRET = process.env.JWT_SECRET || 'chnageMe'

const signJWT = (data: object) => jwt.sign(data, SECRET)
function verifyJWT<T>(token: string) {
  return jwt.verify(token, SECRET) as T
}

export { signJWT, verifyJWT }
