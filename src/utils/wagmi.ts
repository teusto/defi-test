import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, polygonAmoy } from '@reown/appkit/networks'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '6b25c0b23fbb7f575999e32610b088ec'

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum, polygonAmoy]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
});

export const config = wagmiAdapter.wagmiConfig;