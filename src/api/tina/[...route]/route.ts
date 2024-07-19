import { NextResponse } from 'next/server'
import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'
import { TinaAuthJSProvider } from 'tinacms-authjs'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authorization: isLocal
    ? new LocalBackendAuthProvider()
    : new TinaAuthJSProvider({
        authOptions: {
          useSecureCookies: process.env.NODE_ENV === 'production',
        },
      }),
  tinaOptions: {
    contentApiUrlOverride: `/api/tina/gql`,
  },
})

export { handler as GET, handler as POST }