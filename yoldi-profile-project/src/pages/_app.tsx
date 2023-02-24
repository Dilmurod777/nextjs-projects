import type {AppProps} from 'next/app'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import Layout from "@/components/Layout/Layout";
import {createContext} from "react";
import {useEmail} from "@/utils/hooks";
import { EmailContext } from '@/utils/context';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontFamily: 'Inter',
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '25.6px',
                color: '#000000',
                userSelect: 'none',
                boxSizing: 'border-box'
            }
        }
    },
})

export default function App({Component, pageProps}: AppProps) {
    const [email, _] = useEmail()

    return <ChakraProvider theme={theme}>
        <EmailContext.Provider value={email}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </EmailContext.Provider>
    </ChakraProvider>
}
