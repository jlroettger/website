import Document, {Html, Head, Main, NextScript} from "next/document";
import config from "config/config.json";

class MyDocument extends Document {
    render() {
        return (
            <Html lang={config.locale}>
                <Head>
                    <link rel="icon" href="/favicon.ico"/>
                    <meta name="description"
                          content="Open Source Node.js Cross Platform Desktop Automation. Control the mouse, keyboard, and read the screen."/>
		    <meta name="twitter:image:src" content="https://github.com/nut-tree/nut.js/raw/master/.gfx/nut.png"/>
		    <meta name="twitter:site" content="@nutjsdev"/>
		    <meta name="twitter:card" content="summary_large_image"/>
		    <meta name="twitter:title" content="nut.js - Node.js Cross Platform Desktop Automation"/>
		    <meta name="twitter:description" content="Open Source Node.js Cross Platform Desktop Automation. Control the mouse, keyboard, and read the screen"/>
		    <meta property="og:image" content="https://github.com/nut-tree/nut.js/raw/master/.gfx/nut.png"/>
		    <meta property="og:image:alt" content="nut.js - Node.js Cross Platform Desktop Automation"/>
		    <meta property="og:site_name" content="nutjs.dev"/>
		    <meta property="og:type" content="website"/>
		    <meta property="og:title" content="nut.js - Node.js Cross Platform Desktop Automation"/>
		    <meta property="og:url" content="https://nutjs.dev"/>
		    <meta property="og:description" content="Open Source Node.js Cross Platform Desktop Automation. Control the mouse, keyboard, and read the screen"/>
                    <script defer data-domain="nutjs.dev" src="https://plausible.io/js/plausible.js"/>
                </Head>
                <body className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
