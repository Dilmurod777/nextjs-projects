import type {AppProps} from 'next/app'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import Layout from "@/components/Layout/Layout";

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
    return <ChakraProvider theme={theme}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ChakraProvider>
}
