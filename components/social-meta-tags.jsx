import Head from "next/head";

export function SocialMetaTags({title, description}) {
    return (
        <Head>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@nutjsdev"/>
            <meta name="twitter:creator" content="@s1hofmann"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content="https://github.com/nut-tree/nut.js/raw/master/.gfx/nut.png"/>
            <meta name="twitter:image:alt" content="The nut.js logo, a walnut"/>

            <meta property="og:image" content="https://github.com/nut-tree/nut.js/raw/master/.gfx/nut.png"/>
            <meta property="og:image:alt" content="nut.js - Node.js Cross Platform Desktop Automation"/>
            <meta property="og:site_name" content="nutjs.dev"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={title}/>
            <meta property="og:description"
                  content={description}/>
            <meta property="og:url" content="https://nutjs.dev"/>
        </Head>
    )
}