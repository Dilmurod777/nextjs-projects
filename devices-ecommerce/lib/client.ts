import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {SanityImageSource} from "@sanity/image-url/lib/types/types";

export const client = sanityClient({
    projectId: 'herlvqx4',
    dataset: 'production',
    apiVersion: '2023-01-13',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => source ? builder.image(source).url() : '';
