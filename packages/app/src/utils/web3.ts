import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { SITE_INFO, SITE_NAME, SITE_URL } from './site'
import { ETH_CHAINS } from './network'

// @/utils/web3

export const WALLETCONNECT_PROJECT_ID = '053f5a4b4c46eb4e6880df8abe3f3876';

if (!WALLETCONNECT_PROJECT_ID) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}

export const WALLETCONNECT_CONFIG = defaultWagmiConfig({
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: ETH_CHAINS,
  metadata: {
    name: SITE_NAME,
    description: SITE_INFO,
    url: SITE_URL,
    icons: [],
  },
  ssr: true,
  enableEmail: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
