import fetcher from './fetcher'

export const auth = (
  mode: 'login' | 'register',
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body)
}