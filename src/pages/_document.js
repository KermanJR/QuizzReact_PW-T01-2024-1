import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {

  async function getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }

  function getServerSideProps({ req, res }) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
   
    return {
      props: {},
    }
  }

  return (
    <Html lang="pt-br">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}