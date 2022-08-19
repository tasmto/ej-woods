const encode = (data: string) => Buffer.from(data, 'utf8').toString('base64')
const decode = (data: string) => Buffer.from(data, 'base64').toString('utf8')

export { encode, decode }
